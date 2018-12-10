const Mhr = require("menhera").default;
const { GraphQLServer } = require("graphql-yoga");
const { utils } = require("./utils");
const _ = require("lodash");

module.exports = {
  $yoga: {
    ...utils.injectVarFun("yoga"),
    resolvers: {
      $O({ _key, _val }) {
        const key = `yoga.resolvers.${_key}`;
        const target = _.get(Mhr, key, {});
        _.each(_val, (v, k) => {
          if (_.isFunction(v)) {
            _val[k] = {
              resolve: v
            };
          }
        });
        _.set(Mhr, key, { ...target, ..._val });
      }
    },
    middlewares: utils.injectArray("yoga.middlewares"),
    start({ _val: options }) {
      Mhr.$use({ yoga: { beforeStart: options } });
      let yoga = _.get(Mhr, "yoga", {});
      _.each(yoga.resolvers, (v, k) => {
        _.each(v, (v1, k1) => {
          _.set(yoga.resolvers, `${k}.${k1}`, v1.resolve);
        });
      });

      const server = new GraphQLServer(yoga);
      server.start(options, ({ port }) => console.info(`Server is running on ${port}`));
    }
  }
};
