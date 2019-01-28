const gqml = require("gqml");
const modules = require("./modules");

gqml
  .use(modules)
  .yoga({
    typeDefs: `${__dirname}/schema.graphql`
  })
  .start({
    context: ctx => ctx,
    port: 8001
  });
