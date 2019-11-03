import { createAction, createActionWithMeta } from './createAction';

interface actionWMeta {
	action: string;
	withMeta: boolean;
}

export const createSimpleActions = (types: [string]) =>
	types.reduce((acc: {}, current) => {
		const [, actionName] = current.split('/');
		acc[actionName] = createAction(current);
		return acc;
	}, {});

export const createOnDemandActions = (types: [actionWMeta]) =>
	types.reduce((acc: {}, { action, withMeta }) => {
		const [, actionName] = action.split('/');
		acc[actionName] = (withMeta ? createActionWithMeta : createAction)(action);
		return acc;
	}, {});
