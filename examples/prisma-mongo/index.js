const gqml = require("gqml");
const modules = require("./modules");

gqml.use(modules);
gqml.use({
  yoga: {
    // $ yarn add apollo-engine
    // apollo: {
    //   options: {
    //     apiKey: ""
    //   }
    // },
    typeDefs: `${__dirname}/schema.graphql`,
    start: {
      context: ctx => ctx,
      port: 8001
    }
  }
});
