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
	rootReducer: any,
	{ customPersistConfig = {}, mmiddlewares = [] } = {
		customPersistConfig: {},
		mmiddlewares: [],
	}
) => {
	const middlewares = [thunk, ...mmiddlewares];

	const store = reduxCreateStore(
		persistReducer({ ...persistConfig, ...customPersistConfig }, rootReducer),
		composeWithDevTools(applyMiddleware(...middlewares))
	);

	return { store, persistor: persistStore(store) };
};

export default createStore;
