const Mhr = require("menhera").default;
const core = require("./packages/core");
const plugins = require("./plugins");

module.exports = {
  gqml: Mhr.use(core).use(plugins),
  ...require("graphql-shield")
};
