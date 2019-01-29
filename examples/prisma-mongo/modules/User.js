const { prisma } = require("../prisma/generated/prisma-client");
const { p, hash, sign, compare, getUserId } = require("../utils");
const { gqml, PubSub } = require("gqml");

const pubsub = new PubSub();

gqml.yoga({
  resolvers: {
    Query: {
      me: {
        shield: p.isAuthenticatedUser,
        resolve: (parent, args, ctx) => {
          const userId = getUserId(ctx);
          return prisma.user({ id: userId });
        }
      }
    },
    Mutation: {
      signup: async (parent, { name, email, password }, ctx) => {
        const hashedPassword = await hash(password, 10);
        const user = await prisma.createUser({ name, email, password: hashedPassword });
        return {
          token: sign({ userId: user.id }),
          user
        };
      },
      login: async (parent, { email, password }, ctx) => {
        const user = await prisma.user({ email });
        if (!user) throw new Error(`No user found for email: ${email}`);
        const passowrdValid = await compare(password, user.password);
        if (!passowrdValid) throw new Error("Invalid password or username");
        return {
          token: sign({ userId: user.id }),
          user
        };
      }
    },
    Subscription: {
      counter: {
        subscribe: (parent, args) => {
          const channel = Math.random()
            .toString(36)
            .substring(2, 15);
          let count = 0;
          setInterval(() => pubsub.publish(channel, { counter: { count: count++ } }), 2000);
          return pubsub.asyncIterator(channel);
        }
      }
    }
  }
});
