const { gqml } = require("gqml");

const lambda = gqml
  .yoga({
    typeDefs: `
      type Query {
        hello(name: String): String!
      }
    `,
    resolvers: {
      Query: {
        hello: (_, { name }) => `Hello ${name || "World"}`
      }
    }
  })
  .serverless();

exports.server = lambda.graphqlHandler;
exports.playground = lambda.playgroundHandler;
