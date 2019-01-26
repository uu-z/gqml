const Mhr = require("menhera").default;
const { utils } = require("./packages/core/utils");
const path = require("path");
const _ = require("lodash");

module.exports = {
  gqml: Mhr.use(utils.load(path.resolve(__dirname, "./packages/core"))).use({
    core: {
      start: {
        plugins: path.resolve(__dirname, "./plugins")
      }
    }
  }),
  ...require("graphql-shield")
};
