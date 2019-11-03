const spreadPayloadToState = (state: {}, { payload }) => ({
	...state,
	...payload,
});
export default spreadPayloadToState;
