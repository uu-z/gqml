const { p, gql } = require("../utils");
const { gqml } = require("gqml");

gqml.yoga({
  typeDefs: gql`
    type Query {
      Test(name: String): String!
      hello(name: String): String!
    }
  `,
  resolvers: {
    Query: {
      Test: {
        shield: p.checkAuth,
        resolve: (_, { name }) => `Hello ${name || "World"}`
      },
      hello: (_, { name }) => `Hello ${name || "World"}`
    }
  }
});
