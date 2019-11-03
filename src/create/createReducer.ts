import { handleActions } from 'redux-actions';

interface Action {
	type: string;
	payload: any;
	meta?: any;
}

const reducerBuilder = (behaviours: {}, defaultState = {}) => {
	const handler = handleActions(behaviours, defaultState);

	return (state = defaultState, action: Action) => {
		if (action.type in behaviours) {
			return handler(state, action);
		}

		return state;
	};
};

export default reducerBuilder;
