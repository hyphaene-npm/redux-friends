import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import localResolve from 'rollup-plugin-local-resolve';
import typescript from 'rollup-plugin-typescript2';

import pkg from '../package.json';

export const plugins = [
	localResolve(),
	resolve(),
	commonjs(),
	typescript({ tsconfig: 'tsconfig.json' }),
	filesize(),
];
const redux = 'redux';
const reduxPersist = 'redux-persist';

export const external = [redux];
export const externalIncludingPersist = [redux, reduxPersist];

const createObjectWithKeyEqualValues = list =>
	list.reduce((acc, current) => {
		acc[current] = current;
		return acc;
	}, {});

export const globals = createObjectWithKeyEqualValues(externalIncludingPersist);

export const mainInput = 'src/index.ts';
export const persistInput = 'src/create/createPersistedStore.ts';

export const persistOutputPath = 'lib/createPersistedStore.js';
export const outputPath = pkg.main;
