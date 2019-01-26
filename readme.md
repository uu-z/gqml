## gqml

a framework base on menhera graphql-yoga

### Start

```bash
$ yarn add gqml
```

### example

```js
// index.js
const { gqml } = require("gqml");
const modules = require("./modules");

gqml.use(modules);
gqml.use({
  yoga: {
    start: {
      // APOLLO_ENGINE_KEY: "",   $ yarn add apollo-engine
      context: ctx => ctx,
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
