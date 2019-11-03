import type from 'redux-types';

const createTypes = (reducerKey: string, types: [string]) => type(reducerKey, types);

export default createTypes;
