module.exports = {
  extends: [
    "hardcore",
    "hardcore/react",
    "hardcore/react-testing-library",
    "hardcore/jest",
    "hardcore/ts",
  ],

  plugins: ["better-styled-components"],

  env: {
    browser: true,
  },

  rules: {
    "id-length": 0,
    "unicorn/no-null": 0,
    "import/prefer-default-export": 0,
    "import/no-unused-modules": 0,
    "import/group-exports": 0,
    "import/order": [
      2,
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "import/no-cycle": [
      2,
      {
        ignoreExternal: true,
      },
    ],
    "@typescript-eslint/naming-convention": [
      2,
      {
        selector: "default",
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
      },
      {
        selector: ["enumMember"],
        format: ["UPPER_CASE"],
      },
    ],
    "react-perf/jsx-no-new-function-as-prop": 0,
    "react-perf/jsx-no-new-object-as-prop": 0,
    "react-perf/jsx-no-new-array-as-prop": 0,
    "react-perf/jsx-no-jsx-as-prop": 0,
    "react/jsx-no-bind": 0,
    "etc/no-enum": 0,
    "etc/no-commented-out-code": 1,
    "etc/no-misused-generics": 0,
    "react/require-default-props": 0,
    "react/no-multi-comp": 0,
    "func-style": [2, "expression"],
    "react/function-component-definition": [
      2,
      { namedComponents: "arrow-function" },
    ],
    "max-statements": 0,
    "putout/putout": 0,
    "@typescript-eslint/no-magic-numbers": 0,
    "@typescript-eslint/strict-boolean-expressions": 0,
    "react/jsx-props-no-spreading": 0,
    "no-negated-condition": 0,
    "max-lines": 0,
    "max-params": 0,
    "@typescript-eslint/prefer-readonly-parameter-types": 0,
    "@typescript-eslint/no-unsafe-enum-comparison": 0,
    "no-warning-comments": 0,
    "no-duplicate-imports": 0,
  },
  overrides: [
    {
      files: ["*.json", "*.html"],
      rules: {
        "@typescript-eslint/naming-convention": 0,
      },
    },
  ],

  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ["**/smart-contracts/types/**", "theme.ts"],
};
