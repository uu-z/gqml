const gqml = require("gqml");
const path = require("path");
const config = require("./config");

gqml.use({
  core: {
    start: {
      modules: ["modules"].map(m => path.join(__dirname, m))
    }
  },
  yoga: {
    typeDefs: path.join(__dirname, "./schema.graphql"),
    context: ctx => ctx,
    start: {
      port: 8001
    }
  }
});
