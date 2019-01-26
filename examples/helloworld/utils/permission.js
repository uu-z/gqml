const { rule } = require("../../../index");

module.exports = {
  isAuthenticatedUser: rule()((parent, args, ctx) => {
    return true;
  })
};
