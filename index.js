require("./packages/core");
require("./plugins");

module.exports = {
  gqml: require("menhera").default,
  ...require("graphql-shield"),
  ...require("graphql-yoga")
};
