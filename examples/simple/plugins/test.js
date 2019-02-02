const { gqml } = require("gqml");

gqml.use({
  _resolvers: {
    $({ _key, _val }) {
      console.log(_key, _val);
    }
  }
});
