const Mhr = require("menhera").default;
const { utils } = require("./utils");
const _ = require("lodash");

module.exports = {
  $metas: utils.injectObjectDeep("metas"),
  $core: {
    start({ _val: options }) {
      const { plugins = [], modules = [] } = options;
      Mhr.use(utils.load(plugins));
      Mhr.use(utils.load(modules));
    }
  }
};
