const _ = require("lodash");
const { utils } = require("./utils");
const Mhr = require("menhera").default;
const { GraphQLServer, GraphQLServerLambda } = require("graphql-yoga");

Mhr.use({
  $yoga: {
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
      engine.listen(listen, () => console.info(`Server with Apollo Engine is running on http://localhost:${options.port}`));
      return Mhr;
    }
  }
});
