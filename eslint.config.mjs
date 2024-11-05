import eslintConfig from "@delement/eslint-config-master";
import prettierConfig from "eslint-config-prettier";
import prettier from "eslint-plugin-prettier";

const customRules = {
  "@stylistic/js/padded-blocks": "off",
};

const mergedConfig = [
  {
    ...eslintConfig[0], // Первая конфигурация из пакета
    plugins: {
      ...eslintConfig[0].plugins,
      prettier, // Добавляем плагин Prettier
    },
    rules: {
      ...eslintConfig[0].rules,
      ...prettierConfig.rules,
      ...customRules,
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
      "no-console": [
        "error",
        {
          allow: ["debug", "error", "warn"],
        },
      ],
    },
  },
  {
    ...eslintConfig[1],
    rules: {
      ...eslintConfig[1].rules,
      ...prettierConfig.rules,
    },
  },
];

export default mergedConfig;
