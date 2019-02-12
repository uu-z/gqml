const { gqml, gql } = require("../index");

gqml.yoga({
  typeDefs: gql`
    type Query {
      hello(name: String): String!
    }
  `,
  resolvers: {
    Query: {
      hello: (_, { name }) => `Hello ${name || "World"}`
    }
  },
  options: {
    context: ctx => ctx
  },
  beforeStart: ({ server }) => {
    server.get("/test", (req, res) => {
      res.send("Hello World!");
    });
  },
  listen: {
    port: 8001
  }
});
