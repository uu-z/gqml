const { gqml } = require("gqml");
const plugins = require("./plugins");
const modules = require("./modules");

const lambda = gqml
  .use(plugins)
  .use(modules)
  .serverless();

exports.server = lambda.graphqlHandler;
exports.playground = lambda.playgroundHandler;
