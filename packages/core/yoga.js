const Mhr = require("menhera").default;
const { GraphQLServer } = require("graphql-yoga");
const { utils } = require("./utils");
const _ = require("lodash");

module.exports = {
  $yoga: {
    ...utils.injectVarFun("yoga"),
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
    middlewares: utils.injectArray("yoga.middlewares"),
    start({ _val: options }) {
      const { port, APOLLO_ENGINE_KEY } = options;
      Mhr.use({ yoga: { beforeStart: options } });
      let yoga = _.get(Mhr, "yoga", {});
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
