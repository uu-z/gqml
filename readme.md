## gqml

a framework base on menhera graphql-yoga

### Start

```bash
$ yarn add gqml
```

### example

```js
// app.js
const gqml = require("gqml");
const path = require("path");

gqml.use({
  core: {
    start: {
      // plugins:[],
      modules: ["modules"].map(m => path.join(__dirname, m))
    }
  },
  yoga: {
    // resolvers: {
    //   Query: {},
    //   Mutation: {},
    //   Subscription: {}
    // },
    typeDefs: path.join(__dirname, "./schema.graphql"),
    context: ctx => ctx,
    start: {
      // APOLLO_ENGINE_KEY: "",   @yarn add apollo-engine
      port: 8001
    }
  }
});
```

```js
// User.js
const { hash, compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { APP_SECRET } = require("../config");
const { prisma } = require("../prisma/generated/prisma-client");
const { getUserId } = require("../utils");
const { PubSub } = require("graphql-yoga");
const rules = require("../utils/permission");

const pubsub = new PubSub();

module.exports = {
  yoga: {
    resolvers: {
      Query: {
        me: {
          shield: rules.isAuthenticatedUser,
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
  }
};
```
