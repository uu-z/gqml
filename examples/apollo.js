require("./.env");
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
    },
    listen: {
      port: null
    }
  })
  .apollo({
    config: {
      apiKey: process.env.ENGINE_API_KEY
    },
    listen: {
      httpServer: gqml.server.createHttpServer({
        tracing: true,
        cacheControl: true
      }),
      port: 8001
    }
  });
