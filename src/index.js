import createReducer from './create/createReducer';
import { createAction, createActionWithMeta } from './create/createAction';
import createStore from './create/createStore';
import createTypes from './create/createTypes';

import { PAGES, DATA } from './constants';
import createMapDispatchToProps from './create/createMapDispatchToProps';
import createMapStateToProps from './create/createMapStateToProps';

import assignPayloadToKey from './handlePayload/assignPayloadToKey';
import assignPayloadToState from './handlePayload/assignPayloadToState';
import addPayloadToState from './handlePayload/addPayloadToState';
import assignPayloadToNestedKey from './handlePayload/assignPayloadToNestedKey';
import spreadPayloadToState from './handlePayload/spreadPayloadToState';

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
	assignPayloadToNestedKey,
	spreadPayloadToState,
	createMapDispatchToProps,
	createMapStateToProps,
};
