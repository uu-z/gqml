const { gqml } = require("gqml");
require("./plugins");
require("./modules");

const lambda = gqml.serverless();

exports.server = lambda.graphqlHandler;
exports.playground = lambda.playgroundHandler;
