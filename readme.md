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

gqml.use({
  core: {
    start: {
      // plugins:[],
      modules: ["modules"]
    }
  },
  yoga: {
    typeDefs: "./schema.graphql",
    context: ctx => ctx,
    start: {
      // APOLLO_ENGINE_KEY: "",   @yarn add apollo-engine
      port: 8001
    }
  }
});
```

```graphql
# ./schema.graphql
type Query {
  hello(name: String): String!
}
```

```js
// modules/Test.js
module.exports = {
  yoga: {
    resolvers: {
      Query: {
        hello: (_, { name }) => `Hello ${name || "World"}`
      },
      Mutation: {},
      Subscription: {}
    }
  }
};
```
