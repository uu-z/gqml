const { gqml } = require("gqml");
const modules = require("./modules");

gqml.use(modules);
gqml.use({
  yoga: {
    start: {
      // APOLLO_ENGINE_KEY: "",   $ yarn add apollo-engine
      context: ctx => ctx,
      port: 8001
    }
  }
});
