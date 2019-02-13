const { gqml, gql } = require("../index");

gqml.yoga({
  typeDefs: gql`
    type Query {
      hello(name: String): String!
      testUser: User!
    }
    type User {
      id: ID!
      name: String
      email: String!
    }
  `,
  resolvers: {
    Query: {
      hello: (_, { name }) => `Hello ${name || "World"}`,
      testUser: () => ({ id: 1, name: "test", email: "test@gmail.com" })
    }
  },
  options: {
    context: ctx => ctx
  },
  voyager: {
    endpoint: "/voyager",
    options: {
      endpointUrl: "/"
    }
  },
  listen: {
    port: 8001
  }
});
