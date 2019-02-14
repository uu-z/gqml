const Mhr = require("menhera").default;
const _ = require("lodash");
const { mergeTypes } = require("merge-graphql-schemas");

const { error, debug, info, start, success, warn, log } = require("signale");
global.Promise = require("bluebird");

Object.assign(console, {
  error,
  debug,
  info,
  start,
  success,
  warn,
  log
});

const utils = {
  parseResolver(_resolvers) {
    let resolvers = {};
    _.each(_.omitBy(_resolvers, _.isUndefined), (v, k) => {
      if (v.kind == "Subscription") {
        return _.set(resolvers, `${v.kind}.${k}`, v);
      }
      if (v.resolve) {
        _.set(resolvers, `${v.kind}.${k}`, v.resolve);
      }
    });
    return resolvers;
  },
  parseParams() {
    let { schema } = Mhr;
    Mhr.use({ hooks: { _resolvers: schema._resolvers } });

    return {
      typeDefs: mergeTypes(schema.typeDefs, { all: true }),
      resolvers: utils.parseResolver(schema._resolvers)
    };
  },
  InjectItem(name) {
    return {
      I({ _key, _val }) {
        const key = `${name}.${_key}`;
        _.set(Mhr, key, _val);
      }
    };
  },
  set(object) {
    _.each(object, (v, k) => {
      _.set(Mhr, k, v);
    });
  },
  get(name) {
    return _.get(Mhr, name);
  },
  // Utils
  injectMethod(name) {
    return {
      F({ _val }) {
        const key = `${name}`;
        _.set(Mhr, key, _val);
      }
    };
  },
  injectMethods(name) {
    return {
      $({ _key, _val }) {
        const key = `${name}.${_key}`;
        _.set(Mhr, key, _val);
      }
    };
  },
  injectFunctionArray(name) {
    return {
      F({ _val }) {
        let target = _.get(Mhr, name, []);
        _.set(Mhr, name, [...target, _val]);
      }
    };
  },
  injectObject(name) {
    return {
      O({ _val }) {
        let target = _.get(Mhr, name, {});
        _.set(Mhr, name, { ...target, ..._val });
      }
    };
  },
  injectObjectArray(name) {
    return {
      $({ _key, _val }) {
        const key = `${name}.${_key}`;
        const target = _.get(Mhr, key, []);
        _.set(Mhr, key, [...target, ..._val]);
      }
    };
  },
  injectObjectDeep(name) {
    return {
      $O({ _key, _val }) {
        const key = `${name}.${_key}`;
        const target = _.get(Mhr, key, {});
        _.set(Mhr, key, { ...target, ..._val });
      }
    };
  },
  injectVariableDeep(name) {
    return {
      $V({ _key, _val }) {
        const key = `${name}.${_key}`;
        _.set(Mhr, key, _val);
      }
    };
  },
  injectArray(name) {
    return {
      _({ _val }) {
        _val = Array.isArray(_val) ? _val : [_val];
        let target = _.get(Mhr, name, []);
        _.set(Mhr, name, [...target, ..._val]);
      }
    };
  }
};

module.exports = {
  utils
};
