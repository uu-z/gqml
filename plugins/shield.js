const { shield } = require("graphql-shield");
const Mhr = require("menhera").default;
const _ = require("lodash");

Mhr.use({
  _resolvers: {
    _({ _val, _: gqml }) {
      let shields = {};
      _.each(_val, (v, k) => {
        if (v.shield) {
          _.set(shields, `${v.kind}.${k}`, v.shield);
        }
      });
      Mhr.yoga({ middlewares: [shield(shields)] });
    }
  }
});
