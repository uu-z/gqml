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
    context: ctx => ctx,
    start: {
      // APOLLO_ENGINE_KEY: "",   @yarn add apollo-engine
      port: 8001
    }
  }
});
