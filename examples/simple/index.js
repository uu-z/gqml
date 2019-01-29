const { gqml } = require("gqml");

require("./plugins");
require("./modules");

gqml.start({
  context: ctx => ctx,
  port: 8001
});
