## gqml

a framework base on menhera graphql-yoga

### Start

```bash
$ yarn add gqml
```

```js
const { gqml } = require("gqml");

gqml
  .yoga({
    typeDefs: `
      type Query {
        hello(name: String): String!
      }
    `,
    resolvers: {
      Query: {
        hello: (_, { name }) => `Hello ${name || "World"}`
      }
    }
  })
  .start({
    context: ctx => ctx,
    port: 8001
  });
```

### example with serverless

```js
const { gqml } = require("gqml");

const lambda = gqml
  .yoga({
    typeDefs: `
      type Query {
        hello(name: String): String!
      }
    `,
    resolvers: {
      Query: (_, { name }) => `Hello ${name || "World"}`
    }
  })
  .serverless();

exports.server = lambda.graphqlHandler;
exports.playground = lambda.playgroundHandler;
```

### example with modules

```js
const { gqml } = require("gqml");
const modules = require("./modules");
// const plugins = require("./plugins");

gqml
  // .use(plugins)
  .use(modules)
  .start({
    context: ctx => ctx,
    port: 8001
  });
```

```js
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
        hello: (_, { name }) => `Hello ${name || "World"}`
      }
    }
  }
};
```
