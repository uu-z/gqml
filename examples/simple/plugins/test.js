const { gqml } = require("gqml");

gqml.use({
  $yoga: {
    handler: {
      _({ _key, _val }) {
        console.log(_key, _val);
      }
    }
  }
});
