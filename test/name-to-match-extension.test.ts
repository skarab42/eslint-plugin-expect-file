import { RuleTester } from 'eslint';
import { test } from 'vitest';

import * as rule from '../source/rules/name-to-match-extension.js';

type Tests = {
  valid?: (string | RuleTester.ValidTestCase)[] | undefined;
  invalid?: RuleTester.InvalidTestCase[] | undefined;
};

const ruleTester = new RuleTester();
const testRule = (tests: Tests) => (): void => ruleTester.run('name-to-match-extension', rule, tests);

test(
  'name-to-match-extension',
  testRule({
    valid: [
      {
        code: '',
        filename: 'source/index.js',
        options: [{ './source/**': '.js' }],
      },
      {
        code: '',
        filename: 'source/index.js',
        options: [{ './source/**': ['.js'] }],
      },
      {
        code: '',
        filename: 'index.js',
        options: [{ './source/**': ['.js'] }],
      },
    ],
    invalid: [
      {
        code: '',
        filename: 'source/index.js',
        options: [{ './source/**': '.ts' }],
        errors: [{ line: 0, message: "Expected file extension to be '.ts'." }],
      },
      {
        code: '',
        filename: 'source/index.js',
        options: [{ './source/**': ['.ts'] }],
        errors: [{ line: 0, message: "Expected file extension to be '.ts'." }],
      },
    ],
  }),
);
