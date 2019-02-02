const { gqml } = require("gqml");

require("./plugins");
require("./modules");

gqml.yoga({
  listen: {
    port: 8001
  }
});
