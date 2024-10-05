import autoprefixer from "autoprefixer"

export default {
	plugins: [
		"postcss-import", // Для поддержки @import
		"postcss-mixins", // Для миксинов
		"postcss-custom-media", // Для кастомных медиа-запросов
		"postcss-nested", // Для вложенности в стилях
		autoprefixer({
			overrideBrowserslist: ["last 2 versions"], // Настройка для автопрефикса
		}),
	],
}
