import { mainInput, persistInput, persistOutputPath, outputPath } from './rollup/constants';
import { setConfig, formatBuilder } from './rollup/utils';

const jsExt = formatBuilder('umd');
const mainOutput = [jsExt(outputPath)];
const persistOutput = [jsExt(persistOutputPath)];
const mainConfig = setConfig(mainInput, mainOutput);
const persistConfig = setConfig(persistInput, persistOutput);

const config = [mainConfig, persistConfig];

export default config;
