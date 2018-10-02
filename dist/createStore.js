'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _redux = require('redux');

var _reduxDevtoolsExtension = require('redux-devtools-extension');

var _createHashHistory = require('history/createHashHistory');

var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

var _reactRouterRedux = require('react-router-redux');

var _autoMergeLevel = require('redux-persist/lib/stateReconciler/autoMergeLevel2');

var _autoMergeLevel2 = _interopRequireDefault(_autoMergeLevel);

var _reduxPersist = require('redux-persist');

var _storage = require('redux-persist/lib/storage');

var _storage2 = _interopRequireDefault(_storage);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var persistConfig = {
	key: 'root',
	storage: _storage2.default,
	stateReconciler: _autoMergeLevel2.default
};

var getStore = function getStore(rootReducer) {
	var customPersistConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var mmiddlewares = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

	var history = (0, _createHashHistory2.default)();
	var middlewares = [(0, _reactRouterRedux.routerMiddleware)(history), _reduxThunk2.default].concat((0, _toConsumableArray3.default)(mmiddlewares));

	var store = (0, _redux.createStore)((0, _reduxPersist.persistReducer)((0, _extends3.default)({}, persistConfig, customPersistConfig), rootReducer), (0, _reduxDevtoolsExtension.composeWithDevTools)(_redux.applyMiddleware.apply(undefined, (0, _toConsumableArray3.default)(middlewares))));

	var persistor = (0, _reduxPersist.persistStore)(store);
	return { store: store, persistor: persistor, history: history };
};

exports.default = getStore;