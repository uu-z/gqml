require("./packages/core");
require("./plugins");

module.exports = {
  gqml: require("menhera").default,
  gql: str => str,
  ...require("graphql-shield"),
  ...require("graphql-yoga")
};
