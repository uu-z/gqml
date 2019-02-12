const Mhr = require("menhera").default;
const { express } = require("graphql-voyager/middleware");

Mhr.use({
  $yoga: {
    voyager({ _val: options }) {
      Mhr.yoga({
        beforeStart: ({ server }) => {
          server.use("/voyager", express(options));
        }
      });
    }
  }
});
