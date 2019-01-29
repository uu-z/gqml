const { gqml } = require("gqml");

gqml.use({
  yoga: {
    typeDefs: `${__dirname}/Test.graphql`,
    resolvers: {
      Query: {
        hello: (_, { name }) => `Hello ${name || "World"}`
      }
    }
  }
});
