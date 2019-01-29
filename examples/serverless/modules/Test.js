const { gqml } = require("gqml");

gqml.yoga({
  typeDefs: `${__dirname}/Test.graphql`,
  resolvers: {
    Query: {
      hello: (_, { name }) => `Hello ${name || "World"}`
    }
  }
});
