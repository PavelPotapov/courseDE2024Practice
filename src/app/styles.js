const files = await import.meta.webpackContext("../", {
  regExp: /\.pcss$/,
  mode: "eager",
});

// Определите массив с приоритетами
const priorityOrder = [
  "./app/styles/vars.pcss", // Полный путь к файлу
  "./app/styles/palette.pcss",
  "./app/styles/fonts.pcss",
  "./app/styles/global.pcss",
  "./app/styles/utils.pcss",
  // добавьте другие файлы по мере необходимости
];

// Получите все файлы
const allFiles = files.keys();

// Фильтруйте файлы, чтобы разделить на те, которые в приоритете, и остальные
const prioritizedStyles = priorityOrder.filter(
  (name) => allFiles.includes(name) // Проверяем на соответствие полному пути
);

// Отфильтруйте остальные стили
const otherStyles = allFiles.filter(
  (path) => !prioritizedStyles.includes(path)
);

// Объедините массивы, чтобы сначала загружались приоритетные стили
const orderedFiles = [...prioritizedStyles, ...otherStyles];

// Загружайте стили в нужном порядке
const styles = await Promise.all(orderedFiles.map((path) => files(path)));

export { styles };
