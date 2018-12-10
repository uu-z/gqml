const { verify } = require("jsonwebtoken");
const { APP_SECRET } = require("../config");

const getUserId = ctx => {
  const Authorization = ctx.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const verifiedToken = verify(token, APP_SECRET);
    return verifiedToken && verifiedToken.userId;
  }
};

module.exports = {
  getUserId
};
