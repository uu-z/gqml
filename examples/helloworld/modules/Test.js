module.exports = {
  yoga: {
    typeDefs: `
      type Query {
        hello(name: String): String!
      }
    `,
    resolvers: {
      Query: {
        Test: {
          hide: true,
          resolve: (_, { name }) => `Hello ${name || "World"}`
        },
        hello: {
          resolve: (_, { name }) => `Hello ${name || "World"}`
        }
      }
    }
  }
};
