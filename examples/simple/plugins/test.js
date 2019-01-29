const { gqml } = require("gqml");

gqml.use({
  $yoga: {
    _handler: {
      $({ _key, _val }) {
        console.log(_key, _val);
      }
    }
  }
});
