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
    start: {
      // APOLLO_ENGINE_KEY: "",   @yarn add apollo-engine
      context: ctx => ctx,
      port: 8001
    }
  }
});
