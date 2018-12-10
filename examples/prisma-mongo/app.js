const gqml = require("../../index");
const path = require("path");

gqml.$use({
  core: {
    start: {
      modules: ["modules"].map(m => path.resolve(__dirname, m))
    }
  },
  yoga: {
    typeDefs: "./schema.graphql",
    context: ctx => ctx,
    start: {
      port: 8001
    }
  }
});
