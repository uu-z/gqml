const Mhr = require("menhera").default;
const { utils } = require("./packages/core/utils");
const path = require("path");
const _ = require("lodash");

module.exports = Mhr.$use({
  $mount: {
    $({ _val }) {
      let cps = Array.isArray(_val) ? _val : [_val];
      _.each(cps, component => {
        let cp = typeof component === "function" ? component({ _ }) : component;
        Mhr.$use(cp);
      });
    }
  }
})
  .$use(utils.load(path.resolve(__dirname, "./packages/core")))
  .$use({
    core: {
      start: {
        plugins: path.resolve(__dirname, "./plugins")
      }
    }
  });
