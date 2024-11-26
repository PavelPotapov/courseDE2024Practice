import { FilterManager } from "#features/Filter/model/index";
import { API_ENDPOINTS } from "#shared/config/constants";
import { yandexMapCustomEventNames } from "#shared/ui/Map/config/constants";
import { YandexMap } from "#shared/ui/Map/model";

/**
 *
 */
export class MapApp {
  constructor(storeService, apiClient) {
    this.apiClient = apiClient;
    this.storeService = storeService;
    this.apiGeoUrl = "https://geocode-maps.yandex.ru/1.x/?apikey";
    this.apiKey = "b4a559eb-311c-4123-8025-480ecdc62549";

    this.yandexMap = new YandexMap({
      containerSelector: "#map1",
      apiUrl: "https://api-maps.yandex.ru/2.1/?apikey",
      apiKey: this.apiKey,
      lang: "ru_RU",
      center: [53.5, 53.9],
      zoom: 10,
    });

    this.filterManager = new FilterManager({
      filterName: `marks`,
      onUpdate: (changedData) => this.handleFilterChanged(changedData),
    });

    this.filterManager.applyFilters(this.storeService.getFilters()); //Применяем фильтры из стора
    this.loadAndUpdateFilters();
    this.yandexMap
      .initMap()
      .then(async () => {
        this.yandexMap.renderMarks(this.getFilteredMarkers()); //Рендерим метки из стора по фильтрам
        const marks = await this.getMarks();
        this.storeService.updateStore("setMarkers", marks);
      })
      .catch((e) => console.error(e));

    this.#bindYandexMapEvents();
    this.subscribeForStoreService();
  }

  //Обработчик изменения фильтров
  handleFilterChanged(changeData) {
    //TODO: есть замечение, касательно того, что мы всегда подвязываемся к полю inputs, а если у нас будет несколько фильтров? Нужно будет подумать над этим.
    //Тут же необходимо делать проверку если менялось поле ввода адреса и центрировать карту
    const currentState = this.storeService.getFilters().inputs;
    const updatedState = { ...currentState, ...changeData };
    this.storeService.updateStore("setFilters", { inputs: updatedState });
  }

  loadAndUpdateFilters() {
    (async () => {
      try {
        const filters = await this.getFiltersCfg();
        this.storeService.updateStore("setFilters", filters);
        this.filterManager.applyFilters(filters);
      } catch (error) {
        console.error("Ошибка при получении конфигурации фильтров:", error);
      }
    })();
  }

  async getMarks() {
    return this.apiClient
      .get(API_ENDPOINTS.marks.list)
      .then((res) => res?.data?.marks);
  }

  async getFiltersCfg() {
    return this.apiClient
      .get(API_ENDPOINTS.config.list)
      .then((res) => res?.data);
  }

  async handleMarkerClick(e) {
    const {
      detail: { id, mark },
    } = e;

    try {
      const res = await this.apiClient.get(API_ENDPOINTS.marks.detail, {
        id: id,
      });
      const layout = this.yandexMap.getLayoutContentForBallon(res.data);
      this.yandexMap.updateBallonContent(id, mark, layout);
    } catch (e) {
      console.error(e);
    }
  }

  getFilteredMarkers() {
    // Получаем активные фильтры из состояния хранилища
    const activeFilters = this.storeService.getFilters().inputs;

    // Фильтруем метки, оставляем только те, для которых фильтры включены (isChecked: true)
    const filteredMarkers = this.storeService.getMarkers().filter((marker) => {
      // Проверяем, включен ли фильтр для типа метки
      return activeFilters[marker.type]?.isChecked;
    });

    return filteredMarkers;
  }

  handleMarkersChangedInStore() {
    console.debug("markers changed", this.storeService.getMarkers());
    // this.yandexMap.renderMarks(this.storeService.getMarkers());
  }

  handleFiltersChangedInStore() {
    this.yandexMap.renderMarks(this.getFilteredMarkers());
  }

  handleCenterMapByAddress(address) {
    fetch(
      `${this.apiGeoUrl}=${this.apiKey}&geocode=${encodeURIComponent(address)}&format=json`
    )
      .then((res) => res.json())
      .then((data) => {
        const coords =
          data.response.GeoObjectCollection.featureMember[0]?.GeoObject?.Point?.pos?.split(
            " "
          );
        if (coords) {
          const lat = parseFloat(coords[1]);
          const lon = parseFloat(coords[0]);
          this.yandexMap.centerMapByCords([lat, lon]);
        }
      })
      .catch((e) => console.error(e));
  }

  subscribeForStoreService() {
    this.markerSubscription = this.storeService.subscribeToMarkers(() => {
      this.handleMarkersChangedInStore();
    });
    this.filterSubscription = this.storeService.subscribeToFilters(() => {
      this.handleFiltersChangedInStore();
    });
  }

  unsubscribeFromStoreService() {
    this.markerSubscription?.();
    this.subscribeOnStoreChange?.();
  }

  #bindYandexMapEvents() {
    this.yandexMap?.containerMap?.addEventListener(
      yandexMapCustomEventNames.markClicked,
      (e) => {
        this.handleMarkerClick(e);
      }
    );
  }
}
