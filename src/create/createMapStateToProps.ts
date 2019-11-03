const createMapStateToProps = mapper => state =>
	Object.entries(mapper).reduce((createdMapper, [props, selector]: [string, any]) => {
		createdMapper[props] = selector(state);
		return createdMapper;
	}, {});

export default createMapStateToProps;
