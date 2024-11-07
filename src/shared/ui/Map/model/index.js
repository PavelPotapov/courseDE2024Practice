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
    return getExternalScript(`${this.apiUrl}=${this.apiKey}&lang=${this.lang}`)
      .then(() => {
        return new Promise((resolve, reject) => {
          window.ymaps.ready(() => {
            try {
              this.instance = new window.ymaps.Map(
                document.querySelector(this.containerSelector),
                {
                  center: this.center,
                  zoom: this.zoom,
                }
              );
              resolve(this.instance);
            } catch (e) {
              reject(e);
            }
          });
        });
      })
      .catch((error) => {
        console.error("Ошибка при загрузке API Яндекс.Карт:", error);
      });
  }
}
