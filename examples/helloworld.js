const { gqml } = require("../index");

gqml.use({
  yoga: {
    typeDefs: `
      type Query {
        hello(name: String): String!
      }
    `,
    resolvers: {
      Query: {
        hello: {
          //hide: true,
          resolve: (_, { name }) => `Hello ${name || "World"}`
        }
      }
    },
    start: {
      context: ctx => ctx,
      port: 8001
    }
  }
});
