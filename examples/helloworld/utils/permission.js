const { rule } = require("gqml");

module.exports = {
  isAuthenticatedUser: rule()((parent, args, ctx) => {
    return true;
  })
};
