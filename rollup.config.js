import pkg from './package.json';
import { external, plugins, mainInput } from './rollup/constants';
import { setConfig, formatBuilder } from './rollup/utils';

const jsExt = formatBuilder('umd');
const mainOutput = [jsExt(pkg.browser)];
const mainConfig = setConfig(mainInput, mainOutput, external, plugins);
const config = [mainConfig];

export default config;
