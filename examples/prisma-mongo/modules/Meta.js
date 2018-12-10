const rules = require("../utils/permission");

module.exports = {
  metas: {
    Query: {
      me: {
        shield: rules.isAuthenticatedUser
      }
    }
  }
};
