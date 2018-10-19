import { handleActions } from 'redux-actions';

const reducerBuilder = (behaviours, defaultState = {}) => {
  const handler = handleActions(behaviours, defaultState);

  return (state = defaultState, action) => {
    if (action.type in behaviours) {
      return handler(state, action);
    }

    return state;
  };
};

export default reducerBuilder;
