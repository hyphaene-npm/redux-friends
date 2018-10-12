const assignPayloadToKey = key => (state, { payload }) => ({
	...state,
	[key]: payload,
});

export default assignPayloadToKey;
