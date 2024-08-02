module.exports = {
  env: {
    amd: true,
    browser: true,
    es2020: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:perfectionist/recommended-natural",
    "plugin:prettier/recommended"
  ],
  ignorePatterns: [
    "shadcn/",
    "node_modules/",
    "public/",
    "dist/",
    "vite.config.ts"
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx"]
    },
    {
      files: ["./package.json", "./package-lock.json"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "perfectionist/sort-objects": "off"
      }
    }
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react-refresh", "jsx-a11y", "import", "perfectionist", "prettier"],
  root: true,
  rules: {
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": "error",
    "comma-dangle": ["off", "always-multiline"],
    "import/no-default-export": "error",
    "import/no-unused-modules": "error",
    "import/prefer-default-export": "off",
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/anchor-is-valid": "warn",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-onchange": "error",
    "jsx-a11y/no-static-element-interactions": "error",
    "no-console": "off",
    "no-undef": "error",
    "no-unused-vars": "error",
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        next: "*",
        prev: ["const", "let", "var"]
      },
      {
        blankLine: "any",
        next: ["const", "let", "var"],
        prev: ["const", "let", "var"]
      },
      {
        blankLine: "always",
        next: "return",
        prev: "*"
      }
    ],
    "perfectionist/sort-imports": [
      "error",
      {
        "custom-groups": {
          type: {
            react: "react"
          },
          value: {
            components: ["components/**", "./components"],
            context: "context/**",
            local: ["./**", "../**", "../../**", "../../../**"],
            react: [
              "react",
              "react-*",
              "@testing-library/**",
              "react/*",
              "react-dom/*"
            ],
            utils: ["utils/**", "./utils/**"]
          }
        },
        groups: [
          "type",
          "react",
          "context",
          "components",
          "local",
          "utils",
          ["builtin", "external"],
          "internal-type",
          "internal",
          ["parent-type", "sibling-type", "index-type"],
          ["parent", "sibling", "index"],
          "side-effect",
          "style",
          "object",
          "unknown"
        ],
        "internal-pattern": [
          "context/**",
          "components/**",
          "./components/**",
          "utils/**"
        ],
        "newlines-between": "always",
        order: "desc",
        type: "natural"
      }
    ],
    "perfectionist/sort-interfaces": [
      "error",
      {
        order: "asc",
        type: "natural"
      }
    ],
    "perfectionist/sort-jsx-props": [
      "error",
      {
        order: "asc",
        type: "natural"
      }
    ],
    "prettier/prettier": [
      "error",
      {
        bracketSpacing: true,
        doubleQuots: true,
        printWidth: 80,
        proseWrap: "never",
        quoteProps: "as-needed",
        semi: true,
        tabWidth: 2,
        trailingComma: "as-needed",
        useTabs: false
      }
    ],
    "react/jsx-boolean-value": ["error", "always"],
    "react/jsx-closing-bracket-location": ["error", "tag-aligned"],
    "react/jsx-closing-tag-location": "error",
    "react/jsx-curly-brace-presence": ["warn", "never"],
    "react/jsx-equals-spacing": ["error", "never"],
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-refresh/only-export-components": "warn"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
