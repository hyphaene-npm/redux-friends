import type from 'redux-types';

const createTypes = (reducerKey, types) => type(reducerKey, types);

export default createTypes;
