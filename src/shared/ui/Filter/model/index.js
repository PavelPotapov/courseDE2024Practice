/**
 *
 */
export class FilterManager {
  constructor({ containerSelector, onUpdate, filterCfg }) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;
    this.onUpdate = onUpdate;
    if (filterCfg) {
      this.applyFilters(filterCfg);
    }
    this.#bindFilterEvents();
  }

  #bindFilterEvents() {
    console.debug("События в рамках фильтра. change, input");
    this.#notifyChange("какие-то данные надо передать");
  }

  #notifyChange(changeData) {
    console.debug(
      "Оповестить другие элементы о том, что у нас произошли изменения в фильтре",
      changeData
    );
    if (typeof this.onUpdate === "function") {
      this.onUpdate(changeData);
    }

    const event = new CustomEvent("filter::changed", {
      detail: changeData,
    });

    this.container.dispatchEvent(event);
  }

  //Обновления UI
  applyFilters(filtersCfg) {
    console.debug(
      "Найти все элементы фильтра в рамках контейнера и проставить им значения из конфига"
    );
    this.#notifyChange("какие-то изменения");
  }
}
