const { gqml } = require("gqml");
const modules = require("./modules");
// const plugins = require("./plugins");

gqml
  // .use(plugins)
  .use(modules)
  .use({
    yoga: {
      start: {
        // APOLLO_ENGINE_KEY: "",   $ yarn add apollo-engine
        context: ctx => ctx,
        port: 8001
      }
    }
  });
