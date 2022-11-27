import type { ESLint } from 'eslint';

import * as expectExtensions from './rules/expect-extensions.js';

const plugin: ESLint.Plugin = { rules: { 'expect-extensions': expectExtensions } };

export = plugin;
