import { bindActionCreators } from 'redux';

type fn = (callback: any) => any;

const createMapDispatchToProps = (mapper: {}) => (dispatch: fn) =>
	bindActionCreators(mapper, dispatch);

export default createMapDispatchToProps;
