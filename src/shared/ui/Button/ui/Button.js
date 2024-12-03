import { getGeneratedAttrs } from "#shared/lib/utils";

/**
 * Компонент кнопки
 * @return {String}
 */
export const Button = ({
  text,
  iconSlot = "",
  extraClasses = [],
  extraAttrs = [],
}) =>
  `<button class="btn ${extraClasses.join(" ")}" ${getGeneratedAttrs(extraAttrs)} ><span class="btn__icon">${iconSlot}</span><span class="btn__label">${text}</span></button>`;
