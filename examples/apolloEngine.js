require("./.env");
const { gqml, gql } = require("../index");

gqml
  .yoga({
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
    listen: {
      port: null
    }
  })
  .apolloEngine({
    options: {
      apiKey: process.env.ENGINE_API_KEY
    },
    listen: {
      httpServer: gqml.server.createHttpServer({
        tracing: true,
        cacheControl: true
      }),
      port: 8001,
      graphqlPaths: ["/"]
    }
  });
