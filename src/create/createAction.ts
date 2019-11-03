export const createAction = (type: string) => (payload: any) => ({ type, payload });

export const createActionWithMeta = (type: string) => (payload: any, meta: any) => ({
	type,
	payload,
	meta,
});
