import type { ESLint } from 'eslint';

import * as nameToMatchExtension from './rules/name-to-match-extension.js';

const plugin: ESLint.Plugin = {
  rules: {
    'name-to-match-extension': nameToMatchExtension,
  },
};

export = plugin;
