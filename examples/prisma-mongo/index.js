// const gqml = require("gqml");
const gqml = require("../../index");

gqml.use({
  core: {
    start: {
      // plugins:[],
      modules: [`${__dirname}/modules`]
    }
  },
  yoga: {
    // resolvers: {
    //   Query: {},
    //   Mutation: {},
    //   Subscription: {}
    // },
    typeDefs: `${__dirname}/schema.graphql`,
    start: {
      // APOLLO_ENGINE_KEY: "",   @yarn add apollo-engine
      context: ctx => ctx,
      port: 8001
    }
  }
});
