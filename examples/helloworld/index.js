const gqml = require("gqml");
// const gqml = require("../../index");

gqml.use({
  core: {
    start: {
      // plugins:[],
      modules: ["modules"]
    }
  },
  yoga: {
    typeDefs: "./schema.graphql",
    context: ctx => ctx,
    start: {
      // APOLLO_ENGINE_KEY: "",   @yarn add apollo-engine
      port: 8001
    }
  }
});
