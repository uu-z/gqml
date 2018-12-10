const Mhr = require("menhera").default;
const { GraphQLServer } = require("graphql-yoga");
const { utils } = require("./utils");
const _ = require("lodash");

module.exports = {
  $yoga: {
    ...utils.injectVarFun("yoga"),
    resolvers: utils.injectObjectDeep("yoga.resolvers"),
    middlewares: utils.injectArray("yoga.middlewares"),
    start({ _val: options }) {
      Mhr.$use({ yoga: { beforeStart: options } });
      const yoga = _.get(Mhr, "yoga", {});
      const server = new GraphQLServer(yoga);
      server.start(options, ({ port }) => console.info(`Server is running on ${port}`));
    }
  }
};
