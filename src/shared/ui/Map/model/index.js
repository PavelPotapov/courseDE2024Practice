import { getExternalScript } from "#shared/lib/utils/getExtetnalScript";

export class YandexMap {
  constructor({
    containerSelector,
    apiKey,
    center = [55.751574, 37.573856],
    zoom = 10,
    lang = "ru_RU",
    apiUrl = "https://api-maps.yandex.ru/2.1/?apikey",
  }) {
    this.containerSelector = containerSelector;
    this.apiKey = apiKey;
    this.center = center;
    this.zoom = zoom;
    this.lang = lang;
    this.apiUrl = apiUrl;
    this.instance = null;
  }

  initMap() {
    getExternalScript(`${this.apiUrl}=${this.apiKey}&lang=${this.lang}`)
      .then(() => {
        console.debug("Ура, мы можем работать с картой");
      })
      .catch((error) => {
        console.error("Ошибка при загрузке API Яндекс.Карт:", error);
      });
  }
}
