import { createStore, applyMiddleware } from 'redux';
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

const getStore = (rootReducer, customPersistConfig = {}, mmiddlewares = []) => {
	const history = createHistory();
	const middlewares = [routerMiddleware(history), thunk, ...mmiddlewares];

	const store = createStore(
		persistReducer({ ...persistConfig, ...customPersistConfig }, rootReducer),
		composeWithDevTools(applyMiddleware(...middlewares))
	);

	const persistor = persistStore(store);
	return { store, persistor, history };
};

export default getStore;
