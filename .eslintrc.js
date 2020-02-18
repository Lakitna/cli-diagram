module.exports = {
    extends: 'google',
    env: {
        node: true,
        mocha: true,
    },
    globals: {
        expect: 'readonly',
    },
    plugins: [
        'sonarjs',
        'chai-expect',
        'mocha',
        'unicorn',
    ],
    extends: [
        'eslint:recommended',
        'plugin:unicorn/recommended',
        'plugin:sonarjs/recommended',
        'plugin:mocha/recommended',
        'plugin:chai-expect/recommended',
    ],
    rules: {},
    overrides: [
        {
            files: ['test/**/*.js'],
            rules: {
                'sonarjs/no-duplicate-string': 'off',
            },
        },
    ],
};
