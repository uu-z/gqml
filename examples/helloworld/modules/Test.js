module.exports = {
  yoga: {
    resolvers: {
      Query: {
        hello: (_, { name }) => `Hello ${name || "World"}`
      },
      Mutation: {},
      Subscription: {}
    }
  }
};
