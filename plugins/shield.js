const { shield } = require("graphql-shield");
const { gqml } = require("gqml");
const _ = require("lodash");

gqml.use({
  $yoga: {
    handler: {
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
