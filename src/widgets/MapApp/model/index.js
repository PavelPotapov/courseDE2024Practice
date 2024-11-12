import { API_ENDPOINTS } from "#shared/config/constants";
import { YandexMap } from "#shared/ui/Map/model";

export class MapApp {
  constructor(storeService, apiClient) {
    this.apiClient = apiClient;
    this.storeService = storeService;

    this.yandexMap = new YandexMap({
      containerSelector: "#map1",
      apiUrl: "https://api-maps.yandex.ru/2.1/?apikey",
      apiKey: "b4a559eb-311c-4123-8025-480ecdc62549",
      lang: "ru_RU",
      center: [55.751574, 37.573856],
      zoom: 10,
    });

    this.yandexMap
      .initMap()
      .then(async () => {
        const marks = await this.getMarks();
        this.storeService.updateStore("addMarkers", marks);
      })
      .catch((e) => console.error(e));

    this.subscribeForStoreService();
  }

  async getMarks() {
    return this.apiClient
      .get(API_ENDPOINTS.marks.list)
      .then((res) => res?.data?.marks);
  }

  handleMarkersChanged() {
    console.debug("markers changed", this.storeService.getMarkers());
  }

  handleFiltersChanged() {
    console.debug("markers changed", this.storeService.getFilters());
  }

  subscribeForStoreService() {
    this.markerSubscription = this.storeService.subscribeToMarkers(() => {
      this.handleMarkersChanged();
    });
    this.filterSubscription = this.storeService.subscribeToFilters(() => {
      this.handleFiltersChanged();
    });
  }

  unsubscribeFromStoreService() {
    this.markerSubscription?.();
    this.subscribeOnStoreChange?.();
  }
}
