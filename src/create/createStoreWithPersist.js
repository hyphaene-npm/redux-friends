import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
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
	{ needPersist = false, customPersistConfig = {}, mmiddlewares = [] } = {
		customPersistConfig: {},
		mmiddlewares: [],
		needPersist: false,
	}
) => {
	const middlewares = [thunk, ...mmiddlewares];

	const store = reduxCreateStore(
		needPersist
			? persistReducer({ ...persistConfig, ...customPersistConfig }, rootReducer)
			: rootReducer,
		composeWithDevTools(applyMiddleware(...middlewares))
	);

	return { store, ...(needPersist ? { persistor: persistStore(store) } : {}) };
};

export default createStore;
