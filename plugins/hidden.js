const Mhr = require("menhera").default;

Mhr.use({
  _resolvers: {
    $({ _key, _val, parent }) {
      if (_val.hide) {
        parent[_key] = undefined;
      }
    }
  }
});
