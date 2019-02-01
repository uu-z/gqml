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
    typeDefs: `${__dirname}/helloworld.graphql`,
    resolvers: {
      Query: {
        foo: (_, { name }) => `Hello ${name || "World"}`
      }
    }
  })
  .yoga({
    typeDefs: `type Query {
      hello(name: String): String!
    }`,
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

### example with modules

```js
const { gqml } = require("gqml");

require("./plugins");
require("./modules");

gqml.start({
  context: ctx => ctx,
  port: 8001
});
```

### example with apollo-engine

```bash
$ yarn add apollo-engine
```

```js
require("./.env");
const { gqml } = require("gqml");

gqml
  .yoga({
    typeDefs: `type Query {
      hello(name: String): String!
    }`,
    resolvers: {
      Query: {
        hello: (_, { name }) => `Hello ${name || "World"}`
      }
    }
  })
  .start({ port: null })
  .apollo({
    config: {
      apiKey: process.env.ENGINE_API_KEY
    },
    listen: {
      httpServer: gqml.server.createHttpServer({
        tracing: true,
        cacheControl: true
      }),
      port: 8001
    }
  });
```

### example with serverless

```js
const { gqml } = require("gqml");
require("./plugins");
require("./modules");

const lambda = gqml.serverless();

exports.server = lambda.graphqlHandler;
exports.playground = lambda.playgroundHandler;
```
