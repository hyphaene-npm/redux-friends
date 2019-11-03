(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('redux')) :
  typeof define === 'function' && define.amd ? define(['exports', 'redux'], factory) :
  (global = global || self, factory(global.Hyphaene = {}, global.redux));
}(this, (function (exports, redux) { 'use strict';

  var redux__default = 'default' in redux ? redux['default'] : redux;

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  /**
   * Use invariant() to assert state which your program assumes to be true.
   *
   * Provide sprintf-style format (only %s is supported) and arguments
   * to provide information about what broke and what you were
   * expecting.
   *
   * The invariant message will be stripped in production, but the invariant
   * will remain to ensure logic does not differ in production.
   */

  var NODE_ENV = process.env.NODE_ENV;

  var invariant = function(condition, format, a, b, c, d, e, f) {
    if (NODE_ENV !== 'production') {
      if (format === undefined) {
        throw new Error('invariant requires an error message argument');
      }
    }

    if (!condition) {
      var error;
      if (format === undefined) {
        error = new Error(
          'Minified exception occurred; use the non-minified dev environment ' +
          'for the full error message and additional helpful warnings.'
        );
      } else {
        var args = [a, b, c, d, e, f];
        var argIndex = 0;
        error = new Error(
          format.replace(/%s/g, function() { return args[argIndex++]; })
        );
        error.name = 'Invariant Violation';
      }

      error.framesToPop = 1; // we don't care about invariant's own frame
      throw error;
    }
  };

  var invariant_1 = invariant;

  var isFunction = (function (value) {
    return typeof value === 'function';
  });

  var toString = (function (value) {
    return value.toString();
  });

  var DEFAULT_NAMESPACE = '/';
  var ACTION_TYPE_DELIMITER = '||';

  var identity = (function (value) {
    return value;
  });

  var isPlainObject = (function (value) {
    if (typeof value !== 'object' || value === null) return false;
    var proto = value;

    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }

    return Object.getPrototypeOf(value) === proto;
  });

  var isNil = (function (value) {
    return value === null || value === undefined;
  });

  var isMap = (function (value) {
    return typeof Map !== 'undefined' && value instanceof Map;
  });

  function ownKeys(object) {
    if (isMap(object)) {
      // We are using loose transforms in babel. Here we are trying to convert an
      // interable to an array. Loose mode expects everything to already be an
      // array. The problem is that our eslint rules encourage us to prefer
      // spread over Array.from.
      //
      // Instead of disabling loose mode we simply disable the warning.
      // eslint-disable-next-line unicorn/prefer-spread
      return Array.from(object.keys());
    }

    if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {
      return Reflect.ownKeys(object);
    }

    var keys = Object.getOwnPropertyNames(object);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      keys = keys.concat(Object.getOwnPropertySymbols(object));
    }

    return keys;
  }

  function get(key, x) {
    return isMap(x) ? x.get(key) : x[key];
  }

  var flattenWhenNode = (function (predicate) {
    return function flatten(map, _temp, partialFlatMap, partialFlatActionType) {
      var _ref = _temp === void 0 ? {} : _temp,
          _ref$namespace = _ref.namespace,
          namespace = _ref$namespace === void 0 ? DEFAULT_NAMESPACE : _ref$namespace,
          prefix = _ref.prefix;

      if (partialFlatMap === void 0) {
        partialFlatMap = {};
      }

      if (partialFlatActionType === void 0) {
        partialFlatActionType = '';
      }

      function connectNamespace(type) {
        var _ref2;

        if (!partialFlatActionType) return type;
        var types = type.toString().split(ACTION_TYPE_DELIMITER);
        var partials = partialFlatActionType.split(ACTION_TYPE_DELIMITER);
        return (_ref2 = []).concat.apply(_ref2, partials.map(function (p) {
          return types.map(function (t) {
            return "" + p + namespace + t;
          });
        })).join(ACTION_TYPE_DELIMITER);
      }

      function connectPrefix(type) {
        if (partialFlatActionType || !prefix || prefix && new RegExp("^" + prefix + namespace).test(type)) {
          return type;
        }

        return "" + prefix + namespace + type;
      }

      ownKeys(map).forEach(function (type) {
        var nextNamespace = connectPrefix(connectNamespace(type));
        var mapValue = get(type, map);

        if (predicate(mapValue)) {
          flatten(mapValue, {
            namespace: namespace,
            prefix: prefix
          }, partialFlatMap, nextNamespace);
        } else {
          partialFlatMap[nextNamespace] = mapValue;
        }
      });
      return partialFlatMap;
    };
  });

  var isUndefined = (function (value) {
    return value === undefined;
  });

  function handleAction(type, reducer, defaultState) {
    if (reducer === void 0) {
      reducer = identity;
    }

    var types = toString(type).split(ACTION_TYPE_DELIMITER);
    invariant_1(!isUndefined(defaultState), "defaultState for reducer handling " + types.join(', ') + " should be defined");
    invariant_1(isFunction(reducer) || isPlainObject(reducer), 'Expected reducer to be a function or object with next and throw reducers');

    var _ref = isFunction(reducer) ? [reducer, reducer] : [reducer.next, reducer.throw].map(function (aReducer) {
      return isNil(aReducer) ? identity : aReducer;
    }),
        nextReducer = _ref[0],
        throwReducer = _ref[1];

    return function (state, action) {
      if (state === void 0) {
        state = defaultState;
      }

      var actionType = action.type;

      if (!actionType || types.indexOf(toString(actionType)) === -1) {
        return state;
      }

      return (action.error === true ? throwReducer : nextReducer)(state, action);
    };
  }

  var reduceReducers = (function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var initialState = typeof args[args.length - 1] !== 'function' && args.pop();
    var reducers = args;

    if (typeof initialState === 'undefined') {
      throw new TypeError('The initial state may not be undefined. If you do not want to set a value for this reducer, you can use null instead of undefined.');
    }

    return function (prevState, value) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      var prevStateIsUndefined = typeof prevState === 'undefined';
      var valueIsUndefined = typeof value === 'undefined';

      if (prevStateIsUndefined && valueIsUndefined && initialState) {
        return initialState;
      }

      return reducers.reduce(function (newState, reducer) {
        return reducer.apply(undefined, [newState, value].concat(args));
      }, prevStateIsUndefined && !valueIsUndefined && initialState ? initialState : prevState);
    };
  });

  function hasGeneratorInterface(handler) {
    var keys = ownKeys(handler);
    var hasOnlyInterfaceNames = keys.every(function (ownKey) {
      return ownKey === 'next' || ownKey === 'throw';
    });
    return keys.length && keys.length <= 2 && hasOnlyInterfaceNames;
  }

  var flattenReducerMap = flattenWhenNode(function (node) {
    return (isPlainObject(node) || isMap(node)) && !hasGeneratorInterface(node);
  });

  function handleActions(handlers, defaultState, options) {
    if (options === void 0) {
      options = {};
    }

    invariant_1(isPlainObject(handlers) || isMap(handlers), 'Expected handlers to be a plain object.');
    var flattenedReducerMap = flattenReducerMap(handlers, options);
    var reducers = ownKeys(flattenedReducerMap).map(function (type) {
      return handleAction(type, get(type, flattenedReducerMap), defaultState);
    });
    var reducer = reduceReducers.apply(void 0, reducers.concat([defaultState]));
    return function (state, action) {
      if (state === void 0) {
        state = defaultState;
      }

      return reducer(state, action);
    };
  }

  const reducerBuilder = (behaviours, defaultState = {}) => {
      const handler = handleActions(behaviours, defaultState);
      return (state = defaultState, action) => {
          if (action.type in behaviours) {
              return handler(state, action);
          }
          return state;
      };
  };

  const createAction = type => payload => ({ type, payload });
  const createActionWithMeta = type => (payload, meta) => ({ type, payload, meta });

  const createSimpleActions = types => types.reduce((acc, current) => {
      const [, actionName] = current.split('/');
      acc[actionName] = createAction(current);
      return acc;
  }, {});
  const createOnDemandActions = types => types.reduce((acc, { action, withMeta }) => {
      const [, actionName] = action.split('/');
      acc[actionName] = (withMeta ? createActionWithMeta : createAction)(action);
      return acc;
  }, {});
  const createActions = (types, onDemand = false) => (onDemand ? createOnDemandActions : createSimpleActions)(types);

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var reduxDevtoolsExtension = createCommonjsModule(function (module, exports) {

  var compose = redux__default.compose;

  exports.__esModule = true;
  exports.composeWithDevTools = (
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
      function() {
        if (arguments.length === 0) return undefined;
        if (typeof arguments[0] === 'object') return compose;
        return compose.apply(null, arguments);
      }
  );

  exports.devToolsEnhancer = (
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ ?
      window.__REDUX_DEVTOOLS_EXTENSION__ :
      function() { return function(noop) { return noop; } }
  );
  });

  unwrapExports(reduxDevtoolsExtension);
  var reduxDevtoolsExtension_1 = reduxDevtoolsExtension.composeWithDevTools;
  var reduxDevtoolsExtension_2 = reduxDevtoolsExtension.devToolsEnhancer;

  function createThunkMiddleware(extraArgument) {
    return function (_ref) {
      var dispatch = _ref.dispatch,
          getState = _ref.getState;
      return function (next) {
        return function (action) {
          if (typeof action === 'function') {
            return action(dispatch, getState, extraArgument);
          }

          return next(action);
        };
      };
    };
  }

  var thunk = createThunkMiddleware();
  thunk.withExtraArgument = createThunkMiddleware;

  const createStore = (rootReducer, middlewares = []) => {
      const store = redux.createStore(rootReducer, reduxDevtoolsExtension_1(redux.applyMiddleware(thunk, ...middlewares)));
      return store;
  };

  var errors = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var UniquenessErrorMessage = exports.UniquenessErrorMessage = 'Args must be uniques !';
  var TypeErrorMessage = exports.TypeErrorMessage = 'Arguments must be strings';
  var ConstantsTypeErrorMessage = exports.ConstantsTypeErrorMessage = 'Constants must be an array';
  var NamespaceTypeErrorMessage = exports.NamespaceTypeErrorMessage = 'Namespace must be strings';

  });

  unwrapExports(errors);
  var errors_1 = errors.UniquenessErrorMessage;
  var errors_2 = errors.TypeErrorMessage;
  var errors_3 = errors.ConstantsTypeErrorMessage;
  var errors_4 = errors.NamespaceTypeErrorMessage;

  var typesTesters = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var isString = exports.isString = function isString(arg) {
    return typeof arg === 'string' || arg instanceof String;
  };
  var isArray = exports.isArray = function isArray(arg) {
    return Array.isArray(arg);
  };

  });

  unwrapExports(typesTesters);
  var typesTesters_1 = typesTesters.isString;
  var typesTesters_2 = typesTesters.isArray;

  var errorRaisers = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.raiseErrorIfNotUnique = exports.matchTypeOrThrow = undefined;



  var matchTypeOrThrow = exports.matchTypeOrThrow = function matchTypeOrThrow(element, testFunction, message) {
    if (!testFunction(element)) throw new Error(message);
  };

  var raiseErrorIfNotUnique = exports.raiseErrorIfNotUnique = function raiseErrorIfNotUnique(array) {
    var hash = {};
    var duplicate = false;
    for (var i = 0; i < array.length && !duplicate; i++) {
      if (hash[array[i]]) {
        duplicate = true;
      }
      hash[array[i]] = true;
    }
    if (duplicate) throw new Error(errors.UniquenessErrorMessage);
  };

  });

  unwrapExports(errorRaisers);
  var errorRaisers_1 = errorRaisers.raiseErrorIfNotUnique;
  var errorRaisers_2 = errorRaisers.matchTypeOrThrow;

  var actionTypes_1 = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });







  var actionTypes = function actionTypes(namespace, constants) {
    (0, errorRaisers.matchTypeOrThrow)(namespace, typesTesters.isString, errors.NamespaceTypeErrorMessage);
    (0, errorRaisers.matchTypeOrThrow)(constants, typesTesters.isArray, errors.ConstantsTypeErrorMessage);
    (0, errorRaisers.raiseErrorIfNotUnique)(constants);
    return Object.freeze(constants.reduce(function (obj, constant) {
      (0, errorRaisers.matchTypeOrThrow)(constant, typesTesters.isString, errors.TypeErrorMessage);
      obj[constant] = namespace + '/' + constant;
      return obj;
    }, {}));
  };
  exports.default = actionTypes;

  });

  unwrapExports(actionTypes_1);

  var reduxTypes = actionTypes_1;

  const createTypes = (reducerKey, types) => reduxTypes(reducerKey, types);

  const PAGES = 'pages';
  const DATA = 'data';
  const PAGE_SIZE = 'pageSize';

  const createMapDispatchToProps = (mapper) => (dispatch) => redux.bindActionCreators(mapper, dispatch);

  const createMapStateToProps = mapper => state => Object.entries(mapper).reduce((createdMapper, [props, selector]) => {
      createdMapper[props] = selector(state);
      return createdMapper;
  }, {});

  const assignPayloadToKey = key => (state, { payload }) => (Object.assign(Object.assign({}, state), { [key]: payload }));

  const assignPayloadToState = (_state, { payload }) => payload;

  const addPayloadToState = (state, { payload }) => [...state, payload];

  const assignPayloadToNestedKey = (key, key2) => (state, { payload }) => (Object.assign(Object.assign({}, state), { [key]: Object.assign(Object.assign({}, state[key]), { [key2]: payload }) }));

  const spreadPayloadToState = (state, { payload }) => (Object.assign(Object.assign({}, state), payload));

  exports.DATA = DATA;
  exports.PAGES = PAGES;
  exports.PAGE_SIZE = PAGE_SIZE;
  exports.addPayloadToState = addPayloadToState;
  exports.assignPayloadToKey = assignPayloadToKey;
  exports.assignPayloadToNestedKey = assignPayloadToNestedKey;
  exports.assignPayloadToState = assignPayloadToState;
  exports.createAction = createAction;
  exports.createActionWithMeta = createActionWithMeta;
  exports.createActions = createActions;
  exports.createMapDispatchToProps = createMapDispatchToProps;
  exports.createMapStateToProps = createMapStateToProps;
  exports.createReducer = reducerBuilder;
  exports.createStore = createStore;
  exports.createTypes = createTypes;
  exports.spreadPayloadToState = spreadPayloadToState;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
