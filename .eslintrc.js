module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "plugins": [
        "@typescript-eslint",
        "prettier"
    ],
    "rules": {
        'prettier/prettier': 'error',
        'no-console': 'off',
        'no-unused-vars': 'warn',
        'no-underscore-dangle': ['error', { allow: ['_id'] }],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
}
