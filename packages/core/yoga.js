const _ = require("lodash");
const path = require("path");
const { aSet } = require("menhera");
const { utils } = require("../utils");
const Mhr = require("menhera").default;
const { GraphQLServer, GraphQLServerLambda } = require("graphql-yoga");
const { importSchema } = require("graphql-import");

Mhr.use({
  $yoga: {
    typeDefs: {
      _({ _val }) {
        _val = Array.isArray(_val) ? _val : [_val];
        _val = _val.map(i => {
          if (i.endsWith("graphql")) return importSchema(path.resolve(i));
          return i;
        });
        aSet(Mhr, { "yoga.typeDefs": ({ tar = [] }) => [...tar, ..._val] });
      }
    },
    resolvers: {
      $O({ _key, _val }) {
        aSet(Mhr, {
          yoga: {
            _resolvers: ({ tar = {} }) => {
              _.each(_val, (v, k) => {
                if (_.isFunction(v)) {
                  _val[k] = {
                    resolve: v
                  };
                }
                _val[k].kind = _key;
              });
              return { ...tar, ..._val };
            }
          }
        });
      }
    },
    middlewares: utils.injectArray("yoga.middlewares")
    // _handler() {}  hook
  },
  $mixin: {
    $({ _key, _val }) {
      Mhr[_key] = _val.bind(Mhr);
    }
  },
  mixin: {
    yoga(yoga) {
      return Mhr.use({ yoga });
    },
    serverless(options) {
      const yoga = utils.parseParams({ options });
      const lambda = new GraphQLServerLambda(yoga);
      return lambda;
    },
    start(options) {
      const { port } = options;
      const yoga = utils.parseParams({ options });
      const server = new GraphQLServer(yoga);
      utils.set({ server });
      if (!_.isEmpty(port)) {
        server.start(options, ({ port }) => console.info(`Yoga Server is running on http://localhost:${port}`));
      }
      return Mhr;
    },
    apollo({ config, listen }) {
      const { ApolloEngine } = require("apollo-engine");

      const engine = new ApolloEngine(config);
      engine.listen(listen, () => {
        `Server with Apollo Engine is running on http://localhost:${config.port}`;
      });
      return Mhr;
    }
  }
});
