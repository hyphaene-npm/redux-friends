import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createHashHistory';
import { routerMiddleware } from 'react-router-redux';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const persistConfig = {
	key: 'root',
	storage,
	stateReconciler: autoMergeLevel2,
};

const createStore = (
	rootReducer,
	{ customPersistConfig = {}, mmiddlewares = [], isReactNative = false } = {
		customPersistConfig: {},
		mmiddlewares: [],
		isReactNative: false,
	}
) => {
	const history = createHistory();
	const middlewares = [
		...(isReactNative ? [] : routerMiddleware(history)),
		thunk,
		...mmiddlewares,
	];

	const store = reduxCreateStore(
		persistReducer({ ...persistConfig, ...customPersistConfig }, rootReducer),
		composeWithDevTools(applyMiddleware(...middlewares))
	);

	const persistor = persistStore(store);
	return { store, persistor, history };
};

export default createStore;
