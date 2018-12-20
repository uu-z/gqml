// const gqml = require("gqml");
const gqml = require("../../index");
const path = require("path");

gqml.use({
  core: {
    start: {
      // plugins:[],
      modules: ["modules"].map(m => path.join(__dirname, m))
    }
  },
  yoga: {
    // resolvers: {
    //   Query: {},
    //   Mutation: {},
    //   Subscription: {}
    // },
    typeDefs: path.join(__dirname, "./schema.graphql"),
    context: ctx => ctx,
    start: {
      // APOLLO_ENGINE_KEY: "",   @yarn add apollo-engine
      port: 8001
    }
  }
});
