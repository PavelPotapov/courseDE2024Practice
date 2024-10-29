import { getGeneratedAttrs } from "#shared/lib/utils";

/**
 * Компонент кастомного селекта
 * @param {Array} extraAttrs - Дополнительные атрибуты
 * @param {Object} cfg - Объект конфигурации для селекта
 * @return {String}
 */
export const CustomSelect = ({ extraAttrs = [], cfg = {} } = {}) => {
  return `
    <select data-js-custom-select='${JSON.stringify(cfg)}' ${getGeneratedAttrs(extraAttrs)}>
    </select>
  `;
};
