module.exports = {
    parser: "@typescript-eslint/parser",
    env: {
        node: true,
        mocha: true,
    },
    globals: {
        expect: "readonly",
    },
    plugins: [
        "@typescript-eslint",
        "sonarjs",
        "chai-expect",
        "mocha",
        "unicorn",
    ],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:unicorn/recommended",
        "plugin:sonarjs/recommended",
        "plugin:mocha/recommended",
        "plugin:chai-expect/recommended",
    ],
    ignorePatterns: ["**/*.d.ts"],
    rules: {
        "unicorn/no-null": "off",
    },
    overrides: [
        {
            files: ["test/**/*.js"],
            rules: {
                "sonarjs/no-duplicate-string": "off",
            },
        },
    ],
};
