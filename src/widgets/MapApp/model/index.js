import { createStore } from "#shared/store/store";

export class MapApp {
  constructor(storeName) {
    this.store = createStore(storeName);
    this.subscribeOnStoreChange();
    console.debug(
      "Тут будем реализовывать логику нашего виджета, вот готовый стор ->",
      this.store
    );
    setTimeout(() => {
      this.addMarkerToStore({ id: 2, type: "test", cords: [2, 45] });
    }, 7500);
  }

  addMarkerToStore(marker) {
    this.store.getState().addMarker(marker);
  }

  subscribeOnStoreChange() {
    this.subscribeToMarkersChanged();
    this.subscribeToFiltersChanged();
  }

  subscribeToMarkersChanged() {
    this.markerSubscription = this.store.subscribe(
      (state) => state.markers,
      (markers) => {
        console.debug("Состояние маркеров изменилось:", markers);
      }
    );
  }

  subscribeToFiltersChanged() {
    this.filterSubscription = this.store.subscribe(
      (state) => state.activeFilters,
      (filters) => {
        console.debug("Состояние фильтров изменилось:", filters);
      }
    );
  }

  unsubscribeOnStoreChange() {
    this.markerSubscription?.();
    this.subscribeOnStoreChange?.();
  }
}
