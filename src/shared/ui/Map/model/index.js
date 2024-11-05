/**
 * Класс для работы с картой
 */
import { EventManager } from "#shared/lib/services/EventManager";

/**
 *
 */
export class Map extends EventManager {
  constructor({ mode = "single" } = {}) {
    super();
    this.mode = mode;
    this.initMap();
  }

  initMap() {
    console.debug("Карта инициализирована");
  }

  renderMarkers(markers) {}

  clearMarkers() {
    console.debug("Метки очищены");
  }

  addMarker(marker) {
    console.debug(`Метка добавлена: ${marker.info}`);
  }

  deleteMarker(marker) {}

  showBallon() {}

  showHint() {}

  hideHint() {}

  changeMode() {}
}
