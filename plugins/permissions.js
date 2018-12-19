const Mhr = require("menhera").default;
const { shield } = require("graphql-shield");
const { utils } = require("../packages/core/utils");
const _ = require("lodash");

module.exports = {
  $yoga: {
    beforeStart() {
      let shields = { Query: {}, Mutation: {} };
      _.each(shields, (v, type) => {
        const target = _.get(Mhr, `yoga.resolvers.${type}`);
        _.each(target, (v, k) => {
          if (v.shield) {
            _.set(shields[type], k, v.shield);
          }
        });
      });
      Mhr.use({
        yoga: {
          middlewares: [shield(shields)]
        }
      });
    }
  }
};
