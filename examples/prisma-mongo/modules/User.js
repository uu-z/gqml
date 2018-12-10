const { hash, compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { APP_SECRET } = require("../config");
const { prisma } = require("../prisma/generated/prisma-client");
const { getUserId } = require("../utils");

module.exports = {
  yoga: {
    resolvers: {
      Query: {
        me: (parent, args, ctx) => {
          const userId = getUserId(ctx);
          return prisma.user({ id: userId });
        }
      },
      Mutation: {
        signup: async (parent, { name, email, password }, ctx) => {
          const hashedPassword = await hash(password, 10);
          const user = await prisma.createUser({ name, email, password: hashedPassword });
          return {
            token: sign({ userId: user.id }, APP_SECRET),
            user
          };
        },
        login: async (parent, { email, password }, ctx) => {
          const user = await prisma.user({ email });
          if (!user) throw new Error(`No user found for email: ${email}`);
          const passowrdValid = await compare(password, user.password);
          if (!passowrdValid) throw new Error("Invalid password or username");
          return {
            token: sign({ userId: user.id }, APP_SECRET),
            user
          };
        }
      }
    }
  }
};
