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
// const plugins = require("./plugins");

gqml
  // .use(plugins)
  .use(modules)
  .use({
    yoga: {
      options: {
        context: ctx => ctx,
        port: 8001
      }
    }
  });
```

```js
// modules/Test.js
const { p } = require("../utils");

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
          shield: p.checkAuth,
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
