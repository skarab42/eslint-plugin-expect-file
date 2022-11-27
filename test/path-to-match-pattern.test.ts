import { RuleTester } from 'eslint';
import { test } from 'vitest';

import * as rule from '../source/rules/path-to-match-pattern.js';

type Tests = {
  valid?: (string | RuleTester.ValidTestCase)[] | undefined;
  invalid?: RuleTester.InvalidTestCase[] | undefined;
};

const ruleTester = new RuleTester();
const testRule = (tests: Tests) => (): void => ruleTester.run('path-to-match-pattern', rule, tests);

test(
  'path-to-match-pattern',
  testRule({
    valid: [
      {
        code: '',
        filename: 'source/index.js',
        options: [{ './source/**': '**/*.js' }],
      },
      {
        code: '',
        filename: 'source/index.js',
        options: [{ './source/**': ['**/*.js'] }],
      },
      {
        code: '',
        filename: 'index.js',
        options: [{ './source/**': ['**/*.js'] }],
      },
      {
        code: '',
        filename: 'index.js',
        options: [{ './source/**': ['**/*.js'] }, { './**': ['**/*.js'] }],
      },
    ],
    invalid: [
      {
        code: '',
        filename: 'source/index.js',
        options: [{ './source/**': '**/*.ts' }],
        errors: [{ line: 0, message: "Expected file path to match '**/*.ts' pattern." }],
      },
      {
        code: '',
        filename: 'source/index.js',
        options: [{ './source/**': ['**/*.ts'] }],
        errors: [{ line: 0, message: "Expected file path to match '**/*.ts' pattern." }],
      },
    ],
  }),
);
