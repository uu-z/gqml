const Mhr = require("menhera").default;
const { aSet } = require("menhera");
const { GraphQLServer, GraphQLServerLambda } = require("graphql-yoga");
const { utils } = require("../utils");
const _ = require("lodash");
const { importSchema } = require("graphql-import");
const path = require("path");

module.exports = {
  $yoga: {
    resolvers: {
      $O({ _key, _val }) {
        const key = `yoga._resolvers`;
        aSet(Mhr, {
          [key]: ({ tar = {} }) => {
            _.each(_val, (v, k) => {
              if (_.isFunction(v)) {
                _val[k] = {
                  resolve: v
                };
              }
              _val[k].kind = _key;
            });
            return { ...tar, ..._val };
          }
        });
      }
    },
    middlewares: utils.injectArray("yoga.middlewares"),
    typeDefs: {
      _({ _val }) {
        _val = Array.isArray(_val) ? _val : [_val];
        _val = _val.map(i => {
          if (i.endsWith("graphql")) {
            return importSchema(path.resolve(i));
          }
          return i;
        });
        aSet(Mhr, { "yoga.typeDefs": ({ tar = [] }) => [...tar, ..._val] });
      }
    },
    start({ _val: options }) {
      const yoga = utils.parseParams({ options });
      const server = new GraphQLServer(yoga);
      server.start(options, ({ port }) => console.info(`Yoga Server is running on ${port}`));
    },
    _resolvers: {
      $({ _key, _val, parent }) {
        if (_val.hide) {
          parent[_key] = undefined;
        }
      }
    }
  },
  $mixin: {
    $({ _key, _val }) {
      Mhr[_key] = _val.bind(Mhr);
    }
  },
  mixin: {
    yoga(yoga) {
      return Mhr.$use({ yoga });
    },
    serverless() {
      const options = utils.parseParams();
      const lambda = new GraphQLServerLambda(options);
      return lambda;
    }
  }
};
