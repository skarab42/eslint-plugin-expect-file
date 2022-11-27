import * as path from 'node:path';

import type { Rule } from 'eslint';
import { isMatch, some } from 'micromatch';

import { normalizePath } from '../lib/normalize-path.js';

const meta: Rule.RuleModule['meta'] = {
  type: 'layout',
  docs: {
    description: 'Enforce the use of specific file extensions.',
  },
  fixable: undefined,
  messages: {
    expectedExtension: "Expected file extension to be '{{extension}}'.",
    expectedExtensions: 'Expected file extension to be one of {{extensions}}.',
  },
  schema: {
    type: 'array',
    minItems: 1,
    items: {
      type: 'object',
      patternProperties: {
        '': {
          anyOf: [
            { type: 'string', minLength: 1 },
            { type: 'array', items: { type: 'string' }, minItems: 1 },
          ],
        },
      },
      additionalProperties: false,
    },
  },
};

type Patterns = Record<string, string | string[]>;

const rule: Rule.RuleModule = {
  meta,
  create(context) {
    const filePath = normalizePath(path.relative(process.cwd(), context.getFilename()));
    const options = context.options as [Patterns | undefined];
    const patterns: Patterns = options[0] ?? {};
    const matches: string[][] = [];

    for (const [pattern, extension] of Object.entries(patterns)) {
      if (isMatch(filePath, pattern)) {
        matches.push(typeof extension === 'string' ? [extension] : extension);
      }
    }

    if (matches.length === 0) {
      return {};
    }

    const pass = matches.some((extensions) =>
      some(
        filePath,
        extensions.map((extension) => `**/*${extension}`),
      ),
    );

    if (pass) {
      return {};
    }

    const extensions = matches.flat();

    context.report({
      loc: { line: 0, column: 0 },
      messageId: extensions.length === 1 ? 'expectedExtension' : 'expectedExtensions',
      data: {
        extension: String(extensions[0]),
        extensions: JSON.stringify(extensions),
      },
    });

    return {};
  },
};

export = rule;
