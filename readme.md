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
const plugins = require("./plugins");
const modules = require("./modules");

const lambda = gqml
  .use(plugins)
  .use(modules)
  .serverless();

exports.server = lambda.graphqlHandler;
exports.playground = lambda.playgroundHandler;
```

### example with modules

```js
const { gqml } = require("gqml");
const plugins = require("./plugins");
const modules = require("./modules");

gqml
  .use(plugins)
  .use(modules)
  .start({
    context: ctx => ctx,
    port: 8001
  });
```
