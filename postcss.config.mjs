import postcssPresetEnv from "postcss-preset-env";

export default {
  plugins: [
    "postcss-import", // Для поддержки @import
    "postcss-mixins", // Для миксинов
    "postcss-custom-media", // Для кастомных медиа-запросов
    "postcss-nested",
    postcssPresetEnv({
      stage: 3,
      browsers: "last 2 versions",
    }),
  ],
};
