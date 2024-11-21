import { createStore } from "#shared/store/store";

export class StoreService {
  constructor(storageName) {
    this.store = createStore(storageName);
    this.actionMap = {
      addMarker: (payload) => this.store.getState().addMarker(payload),
      removeMarker: (payload) => this.store.getState().removeMarker(payload),
      addMarkers: (payload) => this.store.getState().addMarkers(payload),
      setFilters: (payload) => this.store.getState().setFilters(payload),
      setMarkers: (payload) => this.store.getState().setMarkers(payload),
    };
  }

  subscribeToMarkers(callback) {
    return this.store.subscribe((state) => state.markers, callback);
  }

  subscribeToFilters(callback) {
    return this.store.subscribe((state) => state.activeFilters, callback);
  }

  getMarkers() {
    return this.store.getState().markers;
  }

  getFilters() {
    return this.store.getState().activeFilters;
  }

  updateStore(action, payload) {
    const actionFunction = this.actionMap[action];
    if (actionFunction) {
      actionFunction(payload);
    } else {
      console.warn(`Action ${action} is not defined`);
    }
  }
}
