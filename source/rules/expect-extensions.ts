import type { Rule } from 'eslint';

const meta: Rule.RuleModule['meta'] = {
  type: 'layout',
  docs: {
    description: 'Enforce the use of specific file extensions.',
  },
  fixable: undefined,
  messages: {
    noMatch: "Filename '{{name}}' does not match {{value}}.",
  },
};

const rule: Rule.RuleModule = {
  meta,
  create(context) {
    // rule implementation ...
    // eslint-disable-next-line no-console
    console.log('>>>', context.getFilename(), context.options);

    return {};
  },
};

export = rule;
