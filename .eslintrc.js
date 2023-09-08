module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },

    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        sourceType: 'module',
        ecmaVersion: 'latest'
    },

    rules: {
        'block-spacing': ['error', 'always'],
        camelcase: ['error', { properties: 'never' }],
        'comma-spacing': ['error'],
        'comma-style': ['error'],
        'comma-dangle': ['error', 'never'],
        'computed-property-spacing': ['error'],
        'consistent-return': ['error'],
        'dot-notation': ['error'],
        'eol-last': ['error', 'always'],
        'func-call-spacing': ['error'],
        indent: ['error', 4, { SwitchCase: 1 }],
        'key-spacing': [
            'error',
            { beforeColon: false, afterColon: true, mode: 'minimum' }
        ],
        'keyword-spacing': ['error'],
        'max-len': ['error', 140],
        'no-const-assign': ['error'],
        'no-constant-condition': ['error'],
        'no-dupe-args': ['error'],
        'no-dupe-keys': ['error'],
        'no-duplicate-case': ['error'],
        'no-empty': ['error'],
        'no-eval': ['error'],
        'no-extra-semi': ['error'],
        'no-global-assign': ['error'],
        'no-implied-eval': ['error'],
        'no-lonely-if': ['error'],
        'no-mixed-spaces-and-tabs': ['error'],
        'no-trailing-spaces': ['error'],
        'no-unneeded-ternary': ['error'],
        'no-undef': ['error'],
        'no-unreachable': ['error'],
        'no-whitespace-before-property': ['error'],
        'no-with': ['error'],
        'object-curly-spacing': ['error', 'always'],
        'one-var': ['error', 'never'],
        'prefer-const': ['error'],
        'prefer-arrow-callback': ['error'],
        quotes: ['error', 'single'],
        semi: ['error'],
        'space-before-blocks': ['error'],
        'space-before-function-paren': ['error', 'always'],
        'space-infix-ops': ['error'],
        'space-unary-ops': ['error', { words: true, nonwords: false }],
        'spaced-comment': ['error'],
        'unicode-bom': ['error'],
        yoda: ['error'],
        'guard-for-in': ['error'],
        'no-multi-spaces': ['error'],
        'no-console': 2,
        'no-unused-vars': [
            'error',
            { vars: 'all', args: 'after-used', ignoreRestSiblings: false }
        ]
    },
    globals: {
        describe: true,
        it: true,
        before: true,
        after: true,
        Exception: true,
        Promise: true,
        config: true,
        _: true,
        DB_CONNECTION: true,
        CONSOLE_LOGGER: true,
        CONSTANTS: true,
        MESSAGES: true,
        MOMENT: true
    }
};
