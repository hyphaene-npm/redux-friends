const assignPayloadToNestedStateKey = (key: string, key2: string): {} => (
	state: {},
	{ payload }
) => ({
	...state,
	[key]: {
		...state[key],
		[key2]: payload,
	},
});

export default assignPayloadToNestedStateKey;
