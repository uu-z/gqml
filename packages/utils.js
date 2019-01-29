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
  parseParams({ options = {} } = {}) {
    let yoga = _.get(Mhr, "yoga", {});
    yoga = { ...yoga, ...options, typeDefs: mergeTypes(yoga.typeDefs) };
    const { _resolvers } = yoga;

    Mhr.use({ yoga: { handler: _resolvers } });

    _.each(_.omitBy(_resolvers, _.isUndefined), (v, k) => {
      if (v.resolve) {
        _.set(yoga, `resolvers.${v.kind}.${k}`, v.resolve);
      }
    });
    return yoga;
  },
  injectItem(name) {
    return {
      I({ _key, _val }) {
        const key = `${name}.${_key}`;
        _.set(Mhr, key, _val);
      }
    };
  },
  getItem(name) {
    return _.get(Mhr, name);
  },
  // Utils
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
