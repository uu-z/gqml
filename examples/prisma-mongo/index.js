const gqml = require("gqml");
require("./modules");

gqml
  .yoga({
    typeDefs: `${__dirname}/schema.graphql`
  })
  .start({
    context: ctx => ctx,
    port: 8001
  });
