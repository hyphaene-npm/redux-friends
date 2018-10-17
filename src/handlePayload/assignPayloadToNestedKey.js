const assignPayloadToNestedKey = (key, key2) => (state, { payload }) => ({
	...state,
	[key]: {
		...state[key],
		[key2]: payload,
	},
});

export default assignPayloadToNestedKey;
