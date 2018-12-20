// const gqml = require("gqml");
const gqml = require("../../index");
const path = require("path");

gqml.use({
  core: {
    start: {
      // plugins:[],
      modules: ["modules"].map(m => path.join(__dirname, m))
    }
  },
  yoga: {
    typeDefs: path.join(__dirname, "./schema.graphql"),
    context: ctx => ctx,
    start: {
      port: 8001
    }
    // resolvers: {
    //   Query: {},
    //   Mutation: {},
    //   Subscription: {}
    // }
  }
});
