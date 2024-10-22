import { getGeneratedAttrs } from "#shared/lib/utils";

/**
 * Компонент кастомного селекта
 * @param {Array} options - Опции для селекта
 * @param {string} placeholder - Текст плейсхолдера
 * @param {string} extraClasses - Дополнительный CSS класс
 * @param {Array} extraAttrs - Дополнительные атрибуты
 * @return {string}
 */
export const CustomSelect = ({
  options = [],
  placeholder = "Select an option",
  extraClasses = [],
  extraAttrs = [],
  cfg = {},
} = {}) => {
  return `
    <select data-js-custom-select=${JSON.stringify(cfg)} class="customSelect ${extraClasses.join(" ")}" ${getGeneratedAttrs(extraAttrs)}>
        <option value="" disabled selected hidden>${placeholder}</option>
        ${options.map((option) => `<option value="${option.value}">${option.label}</option>`).join("")}
    </select>
  `;
};
