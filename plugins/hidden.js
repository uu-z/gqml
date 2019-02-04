const Mhr = require("menhera").default;

Mhr.use({
  $hook: {
    _resolvers: {
      $({ _key, _val, parent }) {
        if (_val.hide) {
          parent[_key] = undefined;
        }
      }
    }
  }
});
