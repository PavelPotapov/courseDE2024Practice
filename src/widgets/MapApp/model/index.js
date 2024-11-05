/**
 *
 */
export class MapApp {
  constructor(storeService) {
    this.storeService = storeService; // Используем переданный сервис для работы со стором
    this.subscribeOnStore();
    // this.addMarker({ id: "1", type: "test", cords: [44, 44] });
  }

  handleMarkersUpdate(markers) {
    console.debug("Markers updated:", markers);
  }

  handleFiltersUpdate(filters) {
    console.debug("Filters updated:", filters);
  }

  addMarker(marker) {
    this.storeService.updateStore("addMarker", marker);
  }

  subscribeOnStore() {
    this.unsubscribeMarkers = this.storeService.subscribeToMarkers(
      (markers) => {
        this.handleMarkersUpdate(markers);
      }
    );
    this.unsubscribeFilters = this.storeService.subscribeToFilters(
      (filters) => {
        this.handleFiltersUpdate(filters);
      }
    );
  }

  unsubscribeFromStore() {
    this.unsubscribeMarkers?.();
    this.unsubscribeFilters?.();
  }
}
