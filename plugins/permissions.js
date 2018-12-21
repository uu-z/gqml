const Mhr = require("menhera").default;
const { shield } = require("graphql-shield");
const _ = require("lodash");

module.exports = {
  $yoga: {
    _resolver({ _val }) {
      let shields = {};
      _.each(_val, (v, k) => {
        if (v.shield) {
          _.set(shields, `${v.kind}.${k}`, v.shield);
        }
      });
      Mhr.use({
        yoga: { middlewares: [shield(shields)] }
      });
    }
  }
};
