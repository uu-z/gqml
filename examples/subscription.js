const { gqml, gql, PubSub } = require("../index");

const pubsub = new PubSub();

gqml.yoga({
  typeDefs: gql`
    type Query {
      hello: String!
    }
    type Counter {
      count: Int!
      countStr: String
    }
    type Subscription {
      counter: Counter!
    }
  `,
  resolvers: {
    Query: {
      hello: () => `Hello`
    },
    Counter: {
      countStr: counter => `Current count: ${counter.count}`
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
  },
  options: {
    context: ctx => ctx
  },
  listen: {
    port: 8001
  }
});
