import babel from 'rollup-plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import localResolve from 'rollup-plugin-local-resolve';
// import { terser } from 'rollup-plugin-terser';
// import typescript from 'rollup-plugin-typescript2';

export const plugins = [
	peerDepsExternal(),
	babel({ exclude: 'node_modules/**' }),

	babel({ exclude: 'node_modules/**' }),
	localResolve(),
	resolve(),
	commonjs(),
	filesize(),
];
const redux = 'redux';

export const external = [redux];

const createObjectWithKeyEqualValues = list =>
	list.reduce((acc, current) => {
		acc[current] = current;
		return acc;
	}, {});

export const globals = createObjectWithKeyEqualValues(external);

export const mainInput = 'src/index.js';
