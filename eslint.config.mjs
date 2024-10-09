import parser from "@babel/eslint-parser";
import babelImportsAttrPlugin from "@babel/plugin-syntax-import-attributes";
import stylisticPlugin from "@stylistic/eslint-plugin-js";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
//import babelPresetReact from "@babel/preset-react"; // Уберите, если не используете React

const customImportsRules = {
  "import/first": "error",
  "import/order": [
    2,
    {
      groups: ["external", "builtin", "internal", "sibling", "parent", "index"],
      pathGroups: [
        {
          pattern: "components",
          group: "internal",
        },
        {
          pattern: "common",
          group: "internal",
        },
        {
          pattern: "routes/**",
          group: "internal",
        },
        {
          pattern: "assets/**",
          group: "internal",
          position: "after",
        },
      ],
      pathGroupsExcludedImportTypes: ["internal"],
      alphabetize: {
        order: "asc",
        caseInsensitive: true,
      },
    },
  ],
  "import/no-cycle": "error",
  "import/no-unresolved": "off",
  "import/namespace": "off",
  "import/no-named-as-default": "off",
};

const customStylisticRules = {
  "@stylistic/js/semi": "error",
  "@stylistic/js/semi-spacing": "error",
  "@stylistic/js/computed-property-spacing": ["error", "never"],
  "@stylistic/js/arrow-spacing": "error",
  "@stylistic/js/switch-colon-spacing": "error",
  "@stylistic/js/jsx-quotes": ["error", "prefer-double"],
  "@stylistic/js/comma-spacing": ["error", { before: false, after: true }],
  "@stylistic/js/padded-blocks": [
    "error",
    {
      classes: "always",
      switches: "never",
    },
    { allowSingleLineBlocks: false },
  ],
  "@stylistic/js/indent": [
    "warn",
    2,
    {
      ImportDeclaration: 1,
      ObjectExpression: "first",
      ArrayExpression: 1,
      SwitchCase: 1,
      StaticBlock: { body: 1 },
      MemberExpression: 1,
      FunctionExpression: { parameters: "first", body: 1 },
      FunctionDeclaration: { parameters: "first", body: 1 },
      CallExpression: { arguments: "first" },
    },
  ],
  "@stylistic/js/keyword-spacing": ["error", { before: true, after: true }],
};

const customRules = {
  // Здесь вы можете добавить свои правила
};

const getIgnoreFolders = (
  folders = [
    "node_modules",
    "build",
    "public",
    "assets",
    "dist",
    "temp",
    ".temp",
    ".cache",
    "cache",
  ]
) => {
  const maskName = "%mask%";
  const ignoreMasks = [`**/${maskName}/`, `/**/${maskName}/*`, `${maskName}/`];
  return folders
    .map((folder) => ignoreMasks.map((item) => item.replace(maskName, folder)))
    .flat();
};

const files = ["js", "jsx", "mjs"].map((ex) => `**/*.${ex}`);

const plugins = {
  "@stylistic/js": stylisticPlugin,
  import: importPlugin,
  prettier,
};

const languageOptions = {
  globals: {
    ...globals.browser,
    ...globals.jest,
    ...globals.builtin,
    ...globals.serviceworker,
    ...globals.webextensions,
    ...globals.node,
    ...globals.nodeBuiltin,
    ...globals.es2021,
  },
  parser: parser,
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      //presets: [babelPresetReact], // Уберите, если не используете React
      plugins: [[babelImportsAttrPlugin, { deprecatedAssertSyntax: true }]],
    },
    ecmaFeatures: {
      jsx: false, // Убедитесь, что поддержка JSX отключена
      experimentalObjectRestSpread: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
};

export default [
  {
    plugins,
    files,
    languageOptions,
    settings: {},
    ignores: getIgnoreFolders(),
    rules: {
      ...customRules,
      ...customImportsRules,
      ...customStylisticRules,
      "prettier/prettier": [
        "warn",
        {
          endOfLine: "auto",
        },
      ],
      "no-console": [
        "error",
        {
          allow: ["debug", "error"],
        },
      ],
    },
  },
];
