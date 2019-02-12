## gqml

a framework base on menhera graphql-yoga

examples: https://github.com/uu-z/gqml-examples

### Start

```bash
$ yarn add gqml
```

```js
const { gqml, gql } = require("../index");

gqml.yoga({
  typeDefs: gql`
    type Query {
      hello(name: String): String!
    }
  `,
  resolvers: {
    Query: {
      hello: (_, { name }) => `Hello ${name || "World"}`
    }
  },
  options: {
    context: ctx => ctx
  },
  beforeStart: ({ server }) => {
    server.get("/test", (req, res) => {
      res.send("Hello World!");
    });
  },
  listen: {
    port: 8001
  }
});
```

### example with apollo-engine

```bash
$ yarn add apollo-engine
```

```js
require("./.env");
const { gqml, gql } = require("gqml");

gqml
  .yoga({
    typeDefs: gql`
      type Query {
        hello(name: String): String!
      }
    `,
    resolvers: {
      Query: {
        hello: (_, { name }) => `Hello ${name || "World"}`
      }
    },
    listen: {
      port: null
    }
  })
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

### example with modules

```js
const { gqml } = require("gqml");

require("./plugins");
require("./modules");

gqml.yoga({
  listen: {
    port: 8001
  }
});
```
