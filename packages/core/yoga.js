const _ = require("lodash");
const path = require("path");
const { aSet } = require("menhera");
const { utils } = require("../utils");
const Mhr = require("menhera").default;
const { GraphQLServer, GraphQLServerLambda } = require("graphql-yoga");
const { importSchema } = require("graphql-import");

const typeDefs = {
  _({ _val }) {
    _val = Array.isArray(_val) ? _val : [_val];
    _val = _val.map(i => {
      if (i.endsWith("graphql")) return importSchema(path.resolve(i));
      return i;
    });
    aSet(Mhr, { "schema.typeDefs": ({ tar = [] }) => [...tar, ..._val] });
  }
};

const resolvers = {
  $O({ _key, _val }) {
    aSet(Mhr, {
      schema: {
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
};

Mhr.use({
  $apollo: {
    typeDefs,
    resolvers
  },
  $yoga: {
    typeDefs,
    resolvers,
    middlewares: utils.injectArray("schema.middlewares"),
    beforeStart: ({ _val: fn }) => {
      Mhr.use({
        $hooks: {
          beforeStart() {
            fn(Mhr);
          }
        }
      });
    },
    listen({ _val: options, parent }) {
      const schema = utils.parseParams();
      const server = new GraphQLServer({ ...schema, ...parent.options });
      utils.set({ server });
      if (options.port) {
        Mhr.use({ hooks: { beforeStart: {} } });
        server.start(options, ({ port }) => console.info(`Yoga Server is running on http://localhost:${port}`));
      }
      return Mhr;
    }
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
    apolloEngine({ options, listen }) {
      const { ApolloEngine } = require("apollo-engine");
      const engine = new ApolloEngine(options);
      engine.listen(listen, () => {
        `Server with Apollo Engine is running on http://localhost:${options.port}`;
      });
      return Mhr;
    }
  }
});
