import pkg from './package.json';
import { mainInput, persistInput } from './rollup/constants';
import { setConfig, formatBuilder } from './rollup/utils';

const jsExt = formatBuilder('umd');
const mainOutput = [jsExt(pkg.main)];
const persistOutput = [jsExt('build/createPersistedStore.js')];
const mainConfig = setConfig(mainInput, mainOutput);
const persistConfig = setConfig(persistInput, persistOutput);

const config = [mainConfig, persistConfig];

export default config;
