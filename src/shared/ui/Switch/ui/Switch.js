/**
 * Компонент свитч - кнопки
 * @return {string}
 */
export const Switch = ({ label = "", name = "", extraAttrs = [] } = {}) => {
  return `<label class="switch">
              <input type="checkbox" class="switch__input visuallyHidden" checked>
              <span class="switch__slider"></span>
          </label>`;
};
