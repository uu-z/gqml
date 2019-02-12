require("./plugins");
const { gqml } = require("gqml");

gqml.yoga({
  options: {
    context: ctx => ctx
  },
  listen: {
    port: 8001
  }
});
