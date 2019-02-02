const { gqml } = require("../index");
gqml
  .yoga({
    typeDefs: `type Query {
      hello(name: String): String!
    }`,
    resolvers: {
      Query: {
        hello: (_, { name }) => `Hello ${name || "World"}`
      }
    }
  })
  .start({
    context: ctx => ctx,
    port: 8001
  });
