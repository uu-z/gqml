const { gqml } = require("gqml");
const modules = require("./modules");
// const plugins = require("./plugins");

gqml
  // .use(plugins)
  .use(modules)
  .use({
    yoga: {
      start: {
        context: ctx => ctx,
        port: 8001
      }
    }
  });
