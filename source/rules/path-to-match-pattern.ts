import * as path from 'node:path';

import type { Rule } from 'eslint';
import { isMatch, some } from 'micromatch';

import { normalizePath } from '../lib/normalize-path.js';

const meta: Rule.RuleModule['meta'] = {
  type: 'layout',
  docs: {
    description: 'Enforce the use of specific file path pattern.',
  },
  fixable: undefined,
  messages: {
    expectedToMatchPattern: "Expected file path to match '{{pattern}}' pattern.",
    expectedToMatchPatterns: "Expected file path to match one of '{{patterns}}' patterns.",
  },
};

type Patterns = Record<string, string | string[]>;

const rule: Rule.RuleModule = {
  meta,
  create(context) {
    const filePath = normalizePath(path.relative(process.cwd(), context.getFilename()));
    const options = context.options as [Patterns | undefined];
    const filePatterns: Patterns = options[0] ?? {};
    const matches: string[][] = [];

    for (const [filePattern, patterns] of Object.entries(filePatterns)) {
      if (isMatch(filePath, filePattern)) {
        matches.push(typeof patterns === 'string' ? [patterns] : patterns);
      }
    }

    if (matches.length === 0) {
      return {};
    }

    if (matches.some((patterns) => some(filePath, patterns))) {
      return {};
    }

    const patterns = matches.flat();

    context.report({
      loc: { line: 0, column: 0 },
      messageId: patterns.length === 1 ? 'expectedToMatchPattern' : 'expectedToMatchPatterns',
      data: {
        pattern: String(patterns[0]),
        patterns: JSON.stringify(patterns),
      },
    });

    return {};
  },
};

export = rule;
