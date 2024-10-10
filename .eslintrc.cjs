module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    vueFeatures: {
      filter: true,
      interpolationAsNonHTML: false,
    },
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier', // ! 确保“pretier” 位于最后，不被覆盖规则
  ],
  rules: {
    'prettier/prettier': 'warn',
    'prettier/printWidth': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'vue/multi-word-component-names': 'off',
        'vue/no-dupe-keys': 'off',
      },
    },
  ],
};
