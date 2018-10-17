export const createAction = type => payload => ({ type, payload });

export const createActionWithMeta = type => (payload, meta) => ({ type, payload, meta });
