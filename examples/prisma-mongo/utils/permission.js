const { rule } = require("gqml");
const { getUserId } = require("../utils");

module.exports = {
  isAuthenticatedUser: rule()((parent, args, ctx) => {
    const userId = getUserId(ctx);
    return Boolean(userId);
  })
};
