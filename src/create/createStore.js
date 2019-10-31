import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const createStore = (rootReducer, middlewares = []) => {
	const store = reduxCreateStore(
		rootReducer,
		composeWithDevTools(applyMiddleware(thunk, ...middlewares))
	);

	return store;
};

export default createStore;
