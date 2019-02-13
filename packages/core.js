const _ = require("lodash");
const path = require("path");
const { aSet } = require("menhera");
const { utils } = require("./utils");
const Mhr = require("menhera").default;
const { importSchema } = require("graphql-import");

const typeDefs = {
  _({ _val }) {
    _val = Array.isArray(_val) ? _val : [_val];
    _val = _val.map(i => {
      if (i.endsWith("graphql")) return importSchema(path.resolve(i));
      return i;
    });
    aSet(Mhr, { "schema.typeDefs": ({ tar = [] }) => [...tar, ..._val] });
  }
};

const resolvers = {
  $O({ _key, _val }) {
    aSet(Mhr, {
      schema: {
        _resolvers: ({ tar = {} }) => {
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
      }
    });
  }
};

Mhr.use({
  $typeDefs: typeDefs,
  $resolvers: resolvers,
  $yoga: {
    typeDefs,
    resolvers
  },
  $mixin: {
    $({ _key, _val }) {
      Mhr[_key] = _val.bind(Mhr);
    }
  },
  mixin: {
    schema() {
      return utils.parseParams();
    }
  }
});

module.exports = Mhr;
