const Mhr = require("menhera").default;
const { GraphQLServer } = require("graphql-yoga");
const { utils } = require("./utils");
const _ = require("lodash");
const { mergeTypes } = require("merge-graphql-schemas");
const { importSchema } = require("graphql-import");
const path = require("path");

module.exports = {
  $yoga: {
    resolvers: {
      $O({ _key, _val }) {
        const key = `yoga.resolvers.${_key}`;
        const target = _.get(Mhr, key, {});
        _.each(_val, (v, k) => {
          if (_.isFunction(v)) {
            _val[k] = {
              resolve: v
            };
          }
        });
        _.set(Mhr, key, { ...target, ..._val });
      }
    },
    typeDefs: {
      _({ _val }) {
        _val = Array.isArray(_val) ? _val : [_val];
        _val = _val.map(i => {
          if (i.endsWith("graphql")) {
            return importSchema(path.resolve(i));
          }
          return i;
        });
        let key = "yoga.typeDefs";
        let target = _.get(Mhr, key, []);
        _.set(Mhr, key, [...target, ..._val]);
      }
    },
    middlewares: utils.injectArray("yoga.middlewares"),
    start({ _val: options }) {
      const { port, APOLLO_ENGINE_KEY } = options;

      Mhr.use({ yoga: { beforeStart: options } });
      let yoga = _.get(Mhr, "yoga", {});

      yoga.typeDefs = mergeTypes(yoga.typeDefs);
      _.each(yoga.resolvers, (v, k) => {
        _.each(v, (v1, k1) => {
          if (v1.resolve) {
            _.set(yoga.resolvers, `${k}.${k1}`, v1.resolve);
          }
        });
      });
      const server = new GraphQLServer(yoga);

      if (APOLLO_ENGINE_KEY) {
        const { ApolloEngine } = require("apollo-engine");
        const engine = new ApolloEngine({
          apiKey: APOLLO_ENGINE_KEY
        });
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
      if (!APOLLO_ENGINE_KEY) {
        server.start(options, ({ port }) => console.info(`Yoga Server is running on ${port}`));
      }
    }
  }
};
