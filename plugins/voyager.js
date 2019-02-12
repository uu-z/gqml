const Mhr = require("menhera").default;
const { express } = require("graphql-voyager/middleware");

Mhr.use({
  $yoga: {
    voyager({ _val: { options, endpoint = "/voyager" } = {}, parent }) {
      Mhr.yoga({
        beforeStart: ({ server }) => {
          server.use(endpoint, express(options));
        }
      });
    }
  }
});
