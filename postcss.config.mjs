import postcssPresetEnv from "postcss-preset-env";

export default {
  plugins: [
    "postcss-import", // Для поддержки @import
    "postcss-mixins", // Для миксинов
    "postcss-custom-media", // Для кастомных медиа-запросов
    "postcss-nested", // Для вложенности в стилях
    postcssPresetEnv({
      features: {},
    }),
  ],
};
