import createReducer from './create/createReducer';
import { createAction, createActionWithMeta } from './create/createAction';
import createActions from './create/createActions';
import createStore from './create/createStore';
import createTypes from './create/createTypes';

import { PAGES, DATA, PAGE_SIZE } from './constants';
import createMapDispatchToProps from './create/createMapDispatchToProps';
import createMapStateToProps from './create/createMapStateToProps';

import assignPayloadToStateKey from './handlePayload/assignPayloadToStateKey';
import assignPayloadToNestedStateKey from './handlePayload/assignPayloadToNestedStateKey';
import assignPayloadToState from './handlePayload/assignPayloadToState';
import addPayloadToState from './handlePayload/addPayloadToState';
import spreadPayloadToState from './handlePayload/spreadPayloadToState';

export {
	createReducer,
	createAction,
	createActionWithMeta,
	createActions,
	createStore,
	createTypes,
	PAGES,
	DATA,
	PAGE_SIZE,
	assignPayloadToStateKey,
	assignPayloadToState,
	addPayloadToState,
	assignPayloadToNestedStateKey,
	spreadPayloadToState,
	createMapDispatchToProps,
	createMapStateToProps
};
