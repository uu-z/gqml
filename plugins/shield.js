const { shield } = require("graphql-shield");
const Mhr = require("menhera").default;
const _ = require("lodash");

Mhr.use({
  $yoga: {
    _handler: {
      _({ _val, _: gqml }) {
        let shields = {};
        _.each(_val, (v, k) => {
          if (v.shield) {
            _.set(shields, `${v.kind}.${k}`, v.shield);
          }
        });
        gqml.use({
          yoga: { middlewares: [shield(shields)] }
        });
      }
    }
  }
});
