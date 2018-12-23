const createMapStateToProps = mapper => state =>
	Object.entries(mapper).reduce((createdMapper, [props, selector]) => {
		createdMapper[props] = selector(state);
		return createdMapper;
	}, {});

export default createMapStateToProps;
