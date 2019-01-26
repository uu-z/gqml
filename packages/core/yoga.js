const Mhr = require("menhera").default;
const { aSet } = require("menhera");
const { GraphQLServer } = require("graphql-yoga");
const { utils } = require("../utils");
const _ = require("lodash");
const { mergeTypes } = require("merge-graphql-schemas");
const { importSchema } = require("graphql-import");
const path = require("path");

module.exports = {
  $yoga: {
    resolvers: {
      $O({ _key, _val }) {
        const key = `yoga._resolvers`;
        aSet(Mhr, {
          [key]: ({ tar = {} }) => {
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
        });
      }
    },
    middlewares: utils.injectArray("yoga.middlewares"),
    typeDefs: {
      _({ _val }) {
        _val = Array.isArray(_val) ? _val : [_val];
        _val = _val.map(i => {
          if (i.endsWith("graphql")) {
            return importSchema(path.resolve(i));
          }
          return i;
        });
        aSet(Mhr, { "yoga.typeDefs": ({ tar = [] }) => [...tar, ..._val] });
      }
    },
    apollo: utils.injectItem("apollo"),
    start({ _val: options }) {
      const { port } = options;
      const apollo = utils.getItem("apollo");
      let yoga = _.get(Mhr, "yoga", {});
      yoga = { ...yoga, ...options, typeDefs: mergeTypes(yoga.typeDefs) };
      const { _resolvers } = yoga;

      Mhr.use({
        yoga: {
          _resolvers
        }
      });

      _.each(_.omitBy(_resolvers, _.isUndefined), (v, k) => {
        if (v.resolve) {
          _.set(yoga, `resolvers.${v.kind}.${k}`, v.resolve);
        }
      });

      const server = new GraphQLServer(yoga);

      if (apollo) {
        const { ApolloEngine } = require("apollo-engine");
        const engine = new ApolloEngine(apollo.options);
        const httpServer = server.createHttpServer(options);
        engine.listen(
          {
            port,
            httpServer,
            graphqlPaths: ["/"]
          },
          () => {
            console.info(`Apollo Server is running on ${port}`);
          }
        );
      }
      if (!apollo) {
        server.start(options, ({ port }) => console.info(`Yoga Server is running on ${port}`));
      }
    },
    _resolvers: {
      $({ _key, _val, parent }) {
        if (_val.hide) {
          parent[_key] = undefined;
        }
      }
    }
  }
};
