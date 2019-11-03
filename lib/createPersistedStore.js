(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('redux')) :
	typeof define === 'function' && define.amd ? define(['redux'], factory) :
	(global = global || self, global.Hyphaene = factory(global.redux));
}(this, (function (redux) { 'use strict';

	var redux__default = 'default' in redux ? redux['default'] : redux;

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

	var autoMergeLevel2_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = autoMergeLevel2;
	function autoMergeLevel2(inboundState, originalState, reducedState, _ref) {
	  var debug = _ref.debug;

	  var newState = _extends({}, reducedState);
	  // only rehydrate if inboundState exists and is an object
	  if (inboundState && (typeof inboundState === 'undefined' ? 'undefined' : _typeof(inboundState)) === 'object') {
	    Object.keys(inboundState).forEach(function (key) {
	      // ignore _persist data
	      if (key === '_persist') return;
	      // if reducer modifies substate, skip auto rehydration
	      if (originalState[key] !== reducedState[key]) {
	        if (process.env.NODE_ENV !== 'production' && debug) console.log('redux-persist/stateReconciler: sub state for key `%s` modified, skipping.', key);
	        return;
	      }
	      if (isPlainEnoughObject(reducedState[key])) {
	        // if object is plain enough shallow merge the new values (hence "Level2")
	        newState[key] = _extends({}, newState[key], inboundState[key]);
	        return;
	      }
	      // otherwise hard set
	      newState[key] = inboundState[key];
	    });
	  }

	  if (process.env.NODE_ENV !== 'production' && debug && inboundState && (typeof inboundState === 'undefined' ? 'undefined' : _typeof(inboundState)) === 'object') console.log('redux-persist/stateReconciler: rehydrated keys \'' + Object.keys(inboundState).join(', ') + '\'');

	  return newState;
	}

	/*
	  autoMergeLevel2: 
	    - merges 2 level of substate
	    - skips substate if already modified
	    - this is essentially redux-perist v4 behavior
	*/

	function isPlainEnoughObject(o) {
	  return o !== null && !Array.isArray(o) && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object';
	}
	});

	var autoMergeLevel2 = unwrapExports(autoMergeLevel2_1);

	var KEY_PREFIX = 'persist:';
	var FLUSH = 'persist/FLUSH';
	var REHYDRATE = 'persist/REHYDRATE';
	var PAUSE = 'persist/PAUSE';
	var PERSIST = 'persist/PERSIST';
	var PURGE = 'persist/PURGE';
	var REGISTER = 'persist/REGISTER';
	var DEFAULT_VERSION = -1;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function autoMergeLevel1(inboundState, originalState, reducedState, _ref) {
	  var debug = _ref.debug;

	  var newState = _extends({}, reducedState);
	  // only rehydrate if inboundState exists and is an object
	  if (inboundState && (typeof inboundState === 'undefined' ? 'undefined' : _typeof(inboundState)) === 'object') {
	    Object.keys(inboundState).forEach(function (key) {
	      // ignore _persist data
	      if (key === '_persist') return;
	      // if reducer modifies substate, skip auto rehydration
	      if (originalState[key] !== reducedState[key]) {
	        if (process.env.NODE_ENV !== 'production' && debug) console.log('redux-persist/stateReconciler: sub state for key `%s` modified, skipping.', key);
	        return;
	      }
	      // otherwise hard set the new value
	      newState[key] = inboundState[key];
	    });
	  }

	  if (process.env.NODE_ENV !== 'production' && debug && inboundState && (typeof inboundState === 'undefined' ? 'undefined' : _typeof(inboundState)) === 'object') console.log('redux-persist/stateReconciler: rehydrated keys \'' + Object.keys(inboundState).join(', ') + '\'');

	  return newState;
	}

	/*
	  autoMergeLevel1: 
	    - merges 1 level of substate
	    - skips substate if already modified
	*/

	// @TODO remove once flow < 0.63 support is no longer required.

	function createPersistoid(config) {
	  // defaults
	  var blacklist = config.blacklist || null;
	  var whitelist = config.whitelist || null;
	  var transforms = config.transforms || [];
	  var throttle = config.throttle || 0;
	  var storageKey = '' + (config.keyPrefix !== undefined ? config.keyPrefix : KEY_PREFIX) + config.key;
	  var storage = config.storage;
	  var serialize = config.serialize === false ? function (x) {
	    return x;
	  } : defaultSerialize;

	  // initialize stateful values
	  var lastState = {};
	  var stagedState = {};
	  var keysToProcess = [];
	  var timeIterator = null;
	  var writePromise = null;

	  var update = function update(state) {
	    // add any changed keys to the queue
	    Object.keys(state).forEach(function (key) {
	      if (!passWhitelistBlacklist(key)) return; // is keyspace ignored? noop
	      if (lastState[key] === state[key]) return; // value unchanged? noop
	      if (keysToProcess.indexOf(key) !== -1) return; // is key already queued? noop
	      keysToProcess.push(key); // add key to queue
	    });

	    //if any key is missing in the new state which was present in the lastState,
	    //add it for processing too
	    Object.keys(lastState).forEach(function (key) {
	      if (state[key] === undefined) {
	        keysToProcess.push(key);
	      }
	    });

	    // start the time iterator if not running (read: throttle)
	    if (timeIterator === null) {
	      timeIterator = setInterval(processNextKey, throttle);
	    }

	    lastState = state;
	  };

	  function processNextKey() {
	    if (keysToProcess.length === 0) {
	      if (timeIterator) clearInterval(timeIterator);
	      timeIterator = null;
	      return;
	    }

	    var key = keysToProcess.shift();
	    var endState = transforms.reduce(function (subState, transformer) {
	      return transformer.in(subState, key, lastState);
	    }, lastState[key]);

	    if (endState !== undefined) {
	      try {
	        stagedState[key] = serialize(endState);
	      } catch (err) {
	        console.error('redux-persist/createPersistoid: error serializing state', err);
	      }
	    } else {
	      //if the endState is undefined, no need to persist the existing serialized content
	      delete stagedState[key];
	    }

	    if (keysToProcess.length === 0) {
	      writeStagedState();
	    }
	  }

	  function writeStagedState() {
	    // cleanup any removed keys just before write.
	    Object.keys(stagedState).forEach(function (key) {
	      if (lastState[key] === undefined) {
	        delete stagedState[key];
	      }
	    });

	    writePromise = storage.setItem(storageKey, serialize(stagedState)).catch(onWriteFail);
	  }

	  function passWhitelistBlacklist(key) {
	    if (whitelist && whitelist.indexOf(key) === -1 && key !== '_persist') return false;
	    if (blacklist && blacklist.indexOf(key) !== -1) return false;
	    return true;
	  }

	  function onWriteFail(err) {
	    // @TODO add fail handlers (typically storage full)
	    if (err && process.env.NODE_ENV !== 'production') {
	      console.error('Error storing data', err);
	    }
	  }

	  var flush = function flush() {
	    while (keysToProcess.length !== 0) {
	      processNextKey();
	    }
	    return writePromise || Promise.resolve();
	  };

	  // return `persistoid`
	  return {
	    update: update,
	    flush: flush
	  };
	}

	// @NOTE in the future this may be exposed via config
	function defaultSerialize(data) {
	  return JSON.stringify(data);
	}

	function getStoredState(config) {
	  var transforms = config.transforms || [];
	  var storageKey = '' + (config.keyPrefix !== undefined ? config.keyPrefix : KEY_PREFIX) + config.key;
	  var storage = config.storage;
	  var debug = config.debug;
	  var deserialize = config.serialize === false ? function (x) {
	    return x;
	  } : defaultDeserialize;
	  return storage.getItem(storageKey).then(function (serialized) {
	    if (!serialized) return undefined;else {
	      try {
	        var state = {};
	        var rawState = deserialize(serialized);
	        Object.keys(rawState).forEach(function (key) {
	          state[key] = transforms.reduceRight(function (subState, transformer) {
	            return transformer.out(subState, key, rawState);
	          }, deserialize(rawState[key]));
	        });
	        return state;
	      } catch (err) {
	        if (process.env.NODE_ENV !== 'production' && debug) console.log('redux-persist/getStoredState: Error restoring data ' + serialized, err);
	        throw err;
	      }
	    }
	  });
	}

	function defaultDeserialize(serial) {
	  return JSON.parse(serial);
	}

	function purgeStoredState(config) {
	  var storage = config.storage;
	  var storageKey = '' + (config.keyPrefix !== undefined ? config.keyPrefix : KEY_PREFIX) + config.key;
	  return storage.removeItem(storageKey, warnIfRemoveError);
	}

	function warnIfRemoveError(err) {
	  if (err && process.env.NODE_ENV !== 'production') {
	    console.error('redux-persist/purgeStoredState: Error purging data stored state', err);
	  }
	}

	var _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var DEFAULT_TIMEOUT = 5000;
	/*
	  @TODO add validation / handling for:
	  - persisting a reducer which has nested _persist
	  - handling actions that fire before reydrate is called
	*/
	function persistReducer(config, baseReducer) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (!config) throw new Error('config is required for persistReducer');
	    if (!config.key) throw new Error('key is required in persistor config');
	    if (!config.storage) throw new Error("redux-persist: config.storage is required. Try using one of the provided storage engines `import storage from 'redux-persist/lib/storage'`");
	  }

	  var version = config.version !== undefined ? config.version : DEFAULT_VERSION;
	  var debug = config.debug || false;
	  var stateReconciler = config.stateReconciler === undefined ? autoMergeLevel1 : config.stateReconciler;
	  var getStoredState$1 = config.getStoredState || getStoredState;
	  var timeout = config.timeout !== undefined ? config.timeout : DEFAULT_TIMEOUT;
	  var _persistoid = null;
	  var _purge = false;
	  var _paused = true;
	  var conditionalUpdate = function conditionalUpdate(state) {
	    // update the persistoid only if we are rehydrated and not paused
	    state._persist.rehydrated && _persistoid && !_paused && _persistoid.update(state);
	    return state;
	  };

	  return function (state, action) {
	    var _ref = state || {},
	        _persist = _ref._persist,
	        rest = _objectWithoutProperties(_ref, ['_persist']);

	    var restState = rest;

	    if (action.type === PERSIST) {
	      var _sealed = false;
	      var _rehydrate = function _rehydrate(payload, err) {
	        // dev warning if we are already sealed
	        if (process.env.NODE_ENV !== 'production' && _sealed) console.error('redux-persist: rehydrate for "' + config.key + '" called after timeout.', payload, err);

	        // only rehydrate if we are not already sealed
	        if (!_sealed) {
	          action.rehydrate(config.key, payload, err);
	          _sealed = true;
	        }
	      };
	      timeout && setTimeout(function () {
	        !_sealed && _rehydrate(undefined, new Error('redux-persist: persist timed out for persist key "' + config.key + '"'));
	      }, timeout);

	      // @NOTE PERSIST resumes if paused.
	      _paused = false;

	      // @NOTE only ever create persistoid once, ensure we call it at least once, even if _persist has already been set
	      if (!_persistoid) _persistoid = createPersistoid(config);

	      // @NOTE PERSIST can be called multiple times, noop after the first
	      if (_persist) return state;
	      if (typeof action.rehydrate !== 'function' || typeof action.register !== 'function') throw new Error('redux-persist: either rehydrate or register is not a function on the PERSIST action. This can happen if the action is being replayed. This is an unexplored use case, please open an issue and we will figure out a resolution.');

	      action.register(config.key);

	      getStoredState$1(config).then(function (restoredState) {
	        var migrate = config.migrate || function (s, v) {
	          return Promise.resolve(s);
	        };
	        migrate(restoredState, version).then(function (migratedState) {
	          _rehydrate(migratedState);
	        }, function (migrateErr) {
	          if (process.env.NODE_ENV !== 'production' && migrateErr) console.error('redux-persist: migration error', migrateErr);
	          _rehydrate(undefined, migrateErr);
	        });
	      }, function (err) {
	        _rehydrate(undefined, err);
	      });

	      return _extends$1({}, baseReducer(restState, action), {
	        _persist: { version: version, rehydrated: false }
	      });
	    } else if (action.type === PURGE) {
	      _purge = true;
	      action.result(purgeStoredState(config));
	      return _extends$1({}, baseReducer(restState, action), {
	        _persist: _persist
	      });
	    } else if (action.type === FLUSH) {
	      action.result(_persistoid && _persistoid.flush());
	      return _extends$1({}, baseReducer(restState, action), {
	        _persist: _persist
	      });
	    } else if (action.type === PAUSE) {
	      _paused = true;
	    } else if (action.type === REHYDRATE) {
	      // noop on restState if purging
	      if (_purge) return _extends$1({}, restState, {
	        _persist: _extends$1({}, _persist, { rehydrated: true })

	        // @NOTE if key does not match, will continue to default else below
	      });if (action.key === config.key) {
	        var reducedState = baseReducer(restState, action);
	        var inboundState = action.payload;
	        // only reconcile state if stateReconciler and inboundState are both defined
	        var reconciledRest = stateReconciler !== false && inboundState !== undefined ? stateReconciler(inboundState, state, reducedState, config) : reducedState;

	        var _newState = _extends$1({}, reconciledRest, {
	          _persist: _extends$1({}, _persist, { rehydrated: true })
	        });
	        return conditionalUpdate(_newState);
	      }
	    }

	    // if we have not already handled PERSIST, straight passthrough
	    if (!_persist) return baseReducer(state, action);

	    // run base reducer:
	    // is state modified ? return original : return updated
	    var newState = baseReducer(restState, action);
	    if (newState === restState) return state;else {
	      newState._persist = _persist;
	      return conditionalUpdate(newState);
	    }
	  };
	}

	var _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var initialState = {
	  registry: [],
	  bootstrapped: false
	};

	var persistorReducer = function persistorReducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];

	  switch (action.type) {
	    case REGISTER:
	      return _extends$2({}, state, { registry: [].concat(_toConsumableArray(state.registry), [action.key]) });
	    case REHYDRATE:
	      var firstIndex = state.registry.indexOf(action.key);
	      var registry = [].concat(_toConsumableArray(state.registry));
	      registry.splice(firstIndex, 1);
	      return _extends$2({}, state, { registry: registry, bootstrapped: registry.length === 0 });
	    default:
	      return state;
	  }
	};

	function persistStore(store, options, cb) {
	  // help catch incorrect usage of passing PersistConfig in as PersistorOptions
	  if (process.env.NODE_ENV !== 'production') {
	    var optionsToTest = options || {};
	    var bannedKeys = ['blacklist', 'whitelist', 'transforms', 'storage', 'keyPrefix', 'migrate'];
	    bannedKeys.forEach(function (k) {
	      if (!!optionsToTest[k]) console.error('redux-persist: invalid option passed to persistStore: "' + k + '". You may be incorrectly passing persistConfig into persistStore, whereas it should be passed into persistReducer.');
	    });
	  }
	  var boostrappedCb = cb || false;

	  var _pStore = redux.createStore(persistorReducer, initialState, options ? options.enhancer : undefined);
	  var register = function register(key) {
	    _pStore.dispatch({
	      type: REGISTER,
	      key: key
	    });
	  };

	  var rehydrate = function rehydrate(key, payload, err) {
	    var rehydrateAction = {
	      type: REHYDRATE,
	      payload: payload,
	      err: err,
	      key: key
	      // dispatch to `store` to rehydrate and `persistor` to track result
	    };store.dispatch(rehydrateAction);
	    _pStore.dispatch(rehydrateAction);
	    if (boostrappedCb && persistor.getState().bootstrapped) {
	      boostrappedCb();
	      boostrappedCb = false;
	    }
	  };

	  var persistor = _extends$2({}, _pStore, {
	    purge: function purge() {
	      var results = [];
	      store.dispatch({
	        type: PURGE,
	        result: function result(purgeResult) {
	          results.push(purgeResult);
	        }
	      });
	      return Promise.all(results);
	    },
	    flush: function flush() {
	      var results = [];
	      store.dispatch({
	        type: FLUSH,
	        result: function result(flushResult) {
	          results.push(flushResult);
	        }
	      });
	      return Promise.all(results);
	    },
	    pause: function pause() {
	      store.dispatch({
	        type: PAUSE
	      });
	    },
	    persist: function persist() {
	      store.dispatch({ type: PERSIST, register: register, rehydrate: rehydrate });
	    }
	  });

	  persistor.persist();

	  return persistor;
	}

	var getStorage_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.default = getStorage;


	function noop() {}

	var noopStorage = {
	  getItem: noop,
	  setItem: noop,
	  removeItem: noop
	};

	function hasStorage(storageType) {
	  if ((typeof self === 'undefined' ? 'undefined' : _typeof(self)) !== 'object' || !(storageType in self)) {
	    return false;
	  }

	  try {
	    var storage = self[storageType];
	    var testKey = 'redux-persist ' + storageType + ' test';
	    storage.setItem(testKey, 'test');
	    storage.getItem(testKey);
	    storage.removeItem(testKey);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production') console.warn('redux-persist ' + storageType + ' test failed, persistence will be disabled.');
	    return false;
	  }
	  return true;
	}

	function getStorage(type) {
	  var storageType = type + 'Storage';
	  if (hasStorage(storageType)) return self[storageType];else {
	    if (process.env.NODE_ENV !== 'production') {
	      console.error('redux-persist failed to create sync storage. falling back to memory storage.');
	    }
	    return noopStorage;
	  }
	}
	});

	unwrapExports(getStorage_1);

	var createWebStorage_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.default = createWebStorage;



	var _getStorage2 = _interopRequireDefault(getStorage_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createWebStorage(type) {
	  var storage = (0, _getStorage2.default)(type);
	  return {
	    getItem: function getItem(key) {
	      return new Promise(function (resolve, reject) {
	        resolve(storage.getItem(key));
	      });
	    },
	    setItem: function setItem(key, item) {
	      return new Promise(function (resolve, reject) {
	        resolve(storage.setItem(key, item));
	      });
	    },
	    removeItem: function removeItem(key) {
	      return new Promise(function (resolve, reject) {
	        resolve(storage.removeItem(key));
	      });
	    }
	  };
	}
	});

	unwrapExports(createWebStorage_1);

	var storage = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _createWebStorage2 = _interopRequireDefault(createWebStorage_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _createWebStorage2.default)('local');
	});

	var storage$1 = unwrapExports(storage);

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

	const persistConfig = {
	    key: 'root',
	    storage: storage$1,
	    stateReconciler: autoMergeLevel2,
	};
	const createStore = (rootReducer, { customPersistConfig = {}, mmiddlewares = [] } = {
	    customPersistConfig: {},
	    mmiddlewares: [],
	}) => {
	    const middlewares = [thunk, ...mmiddlewares];
	    const store = redux.createStore(persistReducer(Object.assign(Object.assign({}, persistConfig), customPersistConfig), rootReducer), reduxDevtoolsExtension_1(redux.applyMiddleware(...middlewares)));
	    return { store, persistor: persistStore(store) };
	};

	return createStore;

})));
//# sourceMappingURL=createPersistedStore.js.map
