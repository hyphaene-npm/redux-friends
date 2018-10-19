import babel from 'rollup-plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import localResolve from 'rollup-plugin-local-resolve';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

export const plugins = [
	peerDepsExternal(),
	postcss({ extract: true, plugins: [autoprefixer] }),
	babel({ exclude: 'node_modules/**' }),
	localResolve(),
	resolve(),
	commonjs(),
	filesize(),
];
const react = 'react';
const PropTypes = 'prop-types';
const reactDom = 'react-dom';
const thunk = 'redux-thunk';
const reduxActions = 'redux-actions';
const reduxTypes = 'redux-types';
const reduxPersist = 'redux-persist';
const redux = 'redux';
const reduxDevtoolsExtension = 'redux-devtools-extension';
const createHistory = 'history/createHashHistory';
const reactRouterRedux = 'react-router-redux';
const autoMergeLevel2 = 'redux-persist/lib/stateReconciler/autoMergeLevel2';
const storage = 'redux-persist/lib/storage';

export const external = [
	react,
	reactDom,
	PropTypes,
	thunk,
	reduxPersist,
	reduxActions,
	redux,
	reduxDevtoolsExtension,
	createHistory,
	reactRouterRedux,
	autoMergeLevel2,
	storage,
	reduxTypes,
];

export const globals = external.reduce((acc, current) => {
	acc[current] = current;
	return acc;
}, {});
export const mainInput = 'src/index.js';
