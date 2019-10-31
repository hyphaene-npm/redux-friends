

# Purpose

Redux-friends is a set of helpers designed to remove at its best the verbose part of redux use.
It is therefore opiniated on the declaration part, by trying to let you declare only what you can't avoid.

This package is designed to work with [reduxifire](https://www.npmjs.com/package/reduxifire) with I maintain too, a CLi to generate a redux folder based on this library.

See below the example section for a redux implementation using redux-friends

## Installation

```
npm install redux-friends
```
or

```
yarn add redux-friends
```


## Types

In constants.js
```javascript
import { createTypes } from 'redux-friends';

export const REDUCER_KEY = 'someData'
// used in reducer , see below
export const LOADED = 'loaded';
export const DATA = 'data';

const MyTypesArray = [SET_LOADED, SET_DATA];

export const TYPES = createTypes(REDUCER_KEY, MyTypesArray);
```

return an object of actions in the form
 ```javascript
 { [ACTION_NAME]: `${REDUCER_KEY}/${ACTION_NAME}`}
 ```

to target an action, we can declare
```javascript
TYPES[ACTION_NAME]
```
( see action/reducer example below )

createTypes rests on redux-types, which I collabored on, and is included here to keep harmony in the package API

## Actions
in actions.js
```javascript
import { createAction, createActionWithMeta } from 'redux-friends';
import { SET_LOADED, SET_DATA, TYPES,LOADED, DATA} from './constants';
// will return a function which accepts a payload argument only
export const setLoaded = createAction(TYPES[SET_LOADED]);
// will return a function which accepts payload and meta arguments
export const setLoadedWithMeta = createActionWithMeta(TYPES[SET_LOADED]);
```

setLoaded will return :
```javascript
payload => ({
	payload:payload,
	type: '<injected type with createAction>'
});
```

setLoadedWithMeta will return :
```javascript
 (payload, meta ) => ({
	payload:payload,
	meta:meta,
	type: '<injected type with createActionWithMeta>'
});
```
## mapStateToProps

```javascript
const mapStateToProps = createMapStateToProps({
	formValues: getFormValues,
	loginError: getLoginError,
});
```

is equivalent to
```javascript
const mapStateToProps = state => ({
	formValues: getFormValues(state),
	loginError: getLoginError(state),
});
```

## mapDispatchToProps

```javascript
export const mapDispatchToProps = createMapDispatchToProps({ onLogin: login });
```
is equivalent to
```javascript
export const mapDispatchToProps = dispatch => bindActionCreators({ onLogin: login }, dispatch);
```


## Reducer

```javascript
import { createReducer } from 'redux-friends';
import { SET_LOADED, SET_DATA, TYPES,LOADED, DATA} from './constants';

const defaultState = {};

const behaviors = {
	[TYPES[SET_LOADED]]: (state, { payload }) => ({ ...state, [LOADED]: payload }),
	[TYPES[SET_DATA]]: (state, { payload }) => ({ ...state, [DATA]: payload }),
	// variant if action is created with createActionWithMeta
	[TYPES[SET_LOADED]]: (state, { payload, meta }) => ({ ...state, [LOADED]: payload, someOtherKey:meta }),

};

export default createReducer(behaviors, defaultState);
```


## Store

There are two createStore exposed in this package.
Both embed redux-devtools and redux-thunk middleware.

The first : has only features described above.


```javascript
import { createStore } from 'redux-friends';


const middlewares = ['whatever middlewares you want'];

export const store = createStore(rootReducer, ?middlewares );
```
( note that middleware argument is optional argument )


The second one embed redux-persist

```javascript
import createStore from 'redux-friends/build/createPersistedStore.js';


const middlewares = ['whatever middlewares you want'];

export const { store, persistor } = createStore(rootReducer, ?middlewares );
```
( note that middleware argument is optional argument )

:warning: In this case, createStore is the default export, so use default import ;)

( the reason being that since this file relies on special dependencies that the rest of the lib does not require, it is treated as a separate bundling process, hence the import path )


## Reducer Helpers

Since reducers are often designed to manage the same data structures, here is a list of helpers to minimize the declaration part to achieve same goals :

( equivalences in reducer behaviours)

### addPayloadToState
usefull to add an item in a collection for example


```javascript
const behaviors = {
	[TYPES[ADD_ITEM]]: addPayloadToState,
};
```
is equivalent to :
```javascript
const behaviors = {
	[TYPES[ADD_ITEM]]: (state, { payload }) => [...state, payload],
};
```

### addPayloadToKey

```javascript
const behaviors = {
	[TYPES[SET_LOADED]]: addPayloadToKey(LOADED),
};
```
is equivalent to :
```javascript
const behaviors = {
	[TYPES[SET_LOADED]]: (state, { payload }) => ({
	...state,
	[LOADED]: payload,
});
```
### addPayloadToNestedKey
```javascript
const behaviors = {
	[TYPES[SET_PROFIL_NAME]]: addPayloadToNestedKey(PROFIL, NAME),
};
```
is equivalent to :
```javascript
const behaviors = {
	[TYPES[SET_PROFIL_NAME]]: (state, { payload }) => ({
	...state,
	[PROFIL]: {
		...state[PROFIL],
		[NAME]: payload,
	},
});
```
### assignPayloadToState
```javascript
const behaviors = {
	[TYPES[SET_IS_ONLINE]]: assignPayloadToState,
};
```
is equivalent to :
```javascript
const behaviors = {
	[TYPES[SET_IS_ONLINE]]: (state, { payload }) => payload
};
```
### spreadPayloadToState
```javascript
const behaviors = {
	[TYPES[PATCH_PROFIL]]: spreadPayloadToState,
};
```
is equivalent to :
```javascript
const behaviors = {
	[TYPES[PATCH_PROFIL]]: (state, { payload }) => ({
	...state,
	...payload,
});
```


roadmap :

- [ ] check if all dependencies are required or if a map is possible between externals packages and selected helpers from this package
- [ ] create more helpers for reducers ( CRUD for collection )
