const { p } = require("../utils");
const { gqml } = require("gqml");

gqml.use({
  yoga: {
    typeDefs: `${__dirname}/Test.graphql`,
    // typeDefs: `
    //   type Query {
    //     hello(name: String): String!
    //   }
    // `,
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
  }
});
