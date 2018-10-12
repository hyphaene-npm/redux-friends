export const setConfig = (input, output, external, plugins) => ({
	input,
	output,
	external,
	plugins,
});

export const formatBuilder = format => file => ({
	file,
	format,
	name: 'Whatson',
	globals: {},
});
