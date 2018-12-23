import { createAction, createActionWithMeta } from './createAction';

const createSimpleActions = types =>
	types.reduce((acc, current) => {
		const [, actionName] = current.split('/');
		acc[actionName] = createAction(current);
		return acc;
	}, {});

const createOnDemandActions = types =>
	types.reduce((acc, { action, withMeta }) => {
		const [, actionName] = action.split('/');
		acc[actionName] = (withMeta ? createActionWithMeta : createAction)(action);
		return acc;
	}, {});

const createActions = (types, onDemand = false) =>
	(onDemand ? createOnDemandActions : createSimpleActions)(types);

export default createActions;
