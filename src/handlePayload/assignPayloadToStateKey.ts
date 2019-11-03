const assignPayloadToStateKey = (key: string) => (state: {}, { payload }) => ({
	...state,
	[key]: payload,
});

export default assignPayloadToStateKey;
