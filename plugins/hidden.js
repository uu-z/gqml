const Mhr = require("menhera").default;


Mhr.use({
  $yoga: {
    _handler: {
      $({ _key, _val, parent }) {
        if (_val.hide) {
          parent[_key] = undefined;
        }
      }
    }
  }
});
