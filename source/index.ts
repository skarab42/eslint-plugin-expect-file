import type { ESLint } from 'eslint';

import * as nameToMatchExtension from './rules/name-to-match-extension.js';
import * as pathToMatchPattern from './rules/path-to-match-pattern.js';

const plugin: ESLint.Plugin = {
  rules: {
    'name-to-match-extension': nameToMatchExtension,
    'path-to-match-pattern': pathToMatchPattern,
  },
};

export = plugin;
