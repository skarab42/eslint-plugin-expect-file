# eslint-plugin-expect-file

Enforce the use of specific file name, extension, type, ...

## Installation

```bash
pnpm add -D eslint eslint-plugin-expect-file
```

## Usage

Add it to your `.eslintrc.js`:

```js
module.exports = {
  plugins: ['expect-file'],
  rules: {
    'expect-file/name-to-match-extension': [
      'warn',
      {
        './source/**': ['.ts'],
        './test/**': ['.test.ts'],
      },
    ],
    'expect-file/path-to-match-pattern': [
      'warn',
      {
        './source/**': ['**/*.ts'],
        './test/**': ['**/*.test.ts'],
      },
    ],
  },
};
```

---

Scaffolded with [@skarab/skaffold](https://www.npmjs.com/package/@skarab/skaffold)
