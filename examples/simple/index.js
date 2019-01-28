const { gqml } = require("gqml");
const plugins = require("./plugins");
const modules = require("./modules");

gqml
  .use(plugins)
  .use(modules)
  .start({
    context: ctx => ctx,
    port: 8001
  });
