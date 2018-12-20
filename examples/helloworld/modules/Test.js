module.exports = {
  yoga: {
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
  }
};
