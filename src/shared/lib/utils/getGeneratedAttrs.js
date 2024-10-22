/**
 * Генерируем атрибуты для компонентов
 * @return {String}
 */
export const getGeneratedAttrs = (attributes = []) => {
  return attributes.map((attr) => `${attr.name}=${attr.value}`).join(" ");
};
