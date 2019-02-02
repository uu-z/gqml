import { gqml } from "../index";

gqml.yoga({
  typeDefs: `type Query {
      hello(name: String): String!
    }`,
  resolvers: {
    Query: {
      hello: (_, { name }) => `Hello ${name || "World"}`
    }
  },
  options: {
    context: ctx => ctx
  },
  listen: {
    port: 8001
  }
});
