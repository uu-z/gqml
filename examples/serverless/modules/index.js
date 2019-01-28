module.exports = {
  yoga: {
    typeDefs: [`${__dirname}/Test.graphql`]
  },
  _run: [require("./Test")]
};
