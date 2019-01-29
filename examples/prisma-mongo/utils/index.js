const { verify } = require("jsonwebtoken");
const { APP_SECRET } = require("../config");
const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const getUserId = ctx => {
  const Authorization = ctx.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const verifiedToken = verify(token, APP_SECRET);
    return verifiedToken && verifiedToken.userId;
  }
};

module.exports = {
  getUserId,
  sign: data => sign(data, APP_SECRET),
  hash,
  compare,
  p: require("./permission")
};
