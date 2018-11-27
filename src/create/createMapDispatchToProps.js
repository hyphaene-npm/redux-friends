import { bindActionCreators } from 'redux';

const createMapDispatchToProps = mapper => dispatch => bindActionCreators(mapper, dispatch);

export default createMapDispatchToProps;
