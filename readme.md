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
      modules: [`${__dirname}/modules`]
    }
  },
  yoga: {
    context: ctx => ctx,
    start: {
      // APOLLO_ENGINE_KEY: "",   @yarn add apollo-engine
      port: 8001
    }
  }
});
```

```js
// modules/Test.js
module.exports = {
  yoga: {
    typeDefs: `${__dirname}/Test.graphql`,
    // typeDefs: `
    //   type Query {
    //     hello(name: String): String!
    //   }
    // `,
    resolvers: {
      Query: {
        Test: {
          hide: true,
          resolve: (_, { name }) => `Hello ${name || "World"}`
        },
        hello: {
          resolve: (_, { name }) => `Hello ${name || "World"}`
        }
      }
    }
  }
};
```
