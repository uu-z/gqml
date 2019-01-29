const { p } = require("../utils");
const { gqml } = require("gqml");

gqml.yoga({
  typeDefs: `${__dirname}/Test.graphql`,
  resolvers: {
    Query: {
      Test: {
        hide: true,
        shield: p.checkAuth,
        resolve: (_, { name }) => `Hello ${name || "World"}`
      },
      hello: (_, { name }) => `Hello ${name || "World"}`
    }
  }
});
