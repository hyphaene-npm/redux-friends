import createReducer from './createReducer.js';
import { createAction, createActionWithMeta } from './createAction.js';
import createStore from './createStore.js';
import createTypes from './createTypes.js';
import { PAGES, DATA } from './constants';
import assignPayloadToKey from './assignPayloadToKey';
import assignPayloadToState from './assignPayloadToState';
import addPayloadToState from './addPayloadToState';

export {
	createReducer,
	createAction,
	createActionWithMeta,
	createStore,
	createTypes,
	PAGES,
	DATA,
	assignPayloadToKey,
	assignPayloadToState,
	addPayloadToState,
};
