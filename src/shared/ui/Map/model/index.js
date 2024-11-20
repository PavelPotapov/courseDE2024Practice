import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import {
  iconsPresets,
  classNames as defaultClassNames,
  yandexMapCustomEventNames,
  iconShapeCfg as defaultIconShapeCfg,
} from "../config/constants.js";
import { checkMapInstance } from "../config/lib/checkMapInstance.js";
import { getExternalScript } from "#shared/lib/utils/getExtetnalScript";

/**
 *
 */
export class YandexMap {
  constructor({
    containerSelector,
    apiKey,
    center = [45.751574, 37.573856],
    zoom = 10,
    lang = "ru_RU",
    apiUrl = "https://api-maps.yandex.ru/2.1/?apikey",
    classNames,
    iconShapeCfg,
  }) {
    this.containerSelector = containerSelector;
    this.apiKey = apiKey;
    this.center = center;
    this.zoom = zoom;
    this.lang = lang;
    this.apiUrl = apiUrl;
    this.instance = null;
    this.iconsPresets = iconsPresets;
    this.currentBalloon = null;
    this.currentMarkerIdOpen = null;
    this.classNames = classNames ?? defaultClassNames;
    this.iconShapeCfg = iconShapeCfg ?? defaultIconShapeCfg;
    this.attrs = {
      ballon: "data-js-ballon",
    };
  }

  getBallonLayout() {
    if (window.ymaps) {
      const ballonLayout = window.ymaps.templateLayoutFactory.createClass(
        `<div class="${this.classNames.ballonLayout}">$[[options.contentLayout observeSize]]</div>`,
        {
          build: function () {
            ballonLayout.superclass.build.call(this);
          },
          clear: function () {
            ballonLayout.superclass.clear.call(this);
          },
        }
      );
      return ballonLayout;
    }
    throw new Error("ymaps not ready");
  }

  getBallonContent({ id, children }) {
    const linkToCreateSwiperFn = this.createSwiperForBallon;
    if (window.ymaps) {
      const ballonContent = window.ymaps.templateLayoutFactory.createClass(
        `<div class="${this.classNames.ballonContent}" ${this.attrs.ballon}=${id}> 
            ${children}
        </div>`,
        {
          build: function () {
            ballonContent.superclass.build.call(this);
            linkToCreateSwiperFn(id);
          },
          clear: function () {
            ballonContent.superclass.clear.call(this);
          },
        }
      );
      return ballonContent;
    }
    throw new Error("ymaps not ready");
  }

  createSwiperForBallon(ballonId) {
    try {
      const ballonContainer = document.querySelector(
        `[data-js-ballon="${ballonId}"]`
      );

      const swiperEl = ballonContainer.querySelector(".swiper");
      const swiperPagination =
        ballonContainer.querySelector(".swiper-pagination");

      if (swiperEl && swiperPagination) {
        new Swiper(swiperEl, {
          slidesPerView: 1,
          direction: "horizontal",
          modules: [Pagination],
          pagination: {
            el: swiperPagination,
            clickable: true,
          },
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  getMarkerLayout(typeMarker) {
    if (window.ymaps) {
      const customLayout = window.ymaps.templateLayoutFactory.createClass(
        `<div class="${this.classNames.mark}">
         ${this.iconsPresets[typeMarker] ? this.iconsPresets[typeMarker] : typeMarker}
       </div>`
      );

      return customLayout;
    }
    throw new Error("ymaps not ready");
  }

  #createMap() {
    this.instance = new window.ymaps.Map(
      document.querySelector(this.containerSelector),
      {
        center: this.center,
        zoom: this.zoom,
        type: "yandex#map",
        controls: [],
      },
      {
        suppressMapOpenBlock: true, // Скрыть кнопку открытия карты на Яндексе
      }
    );
    this.#bindEvents();
    return this.instance;
  }

  async initMap() {
    try {
      if (window.ymaps) {
        return this.#createMap();
      }
      //Ждём когда подгрузится внешний скрипт для Yandex API
      await getExternalScript(
        `${this.apiUrl}=${this.apiKey}&lang=${this.lang}`
      );
      //Ждём когда будет готова карта (ожидаем ymaps -> карту)
      await new Promise((resolve, reject) => {
        window.ymaps.ready(() => {
          try {
            resolve(this.#createMap());
          } catch (e) {
            reject(e);
          }
        });
      });
      // Возвращаем карту, если успешно инициализирована
      return this.instance;
    } catch (error) {
      console.error("Ошибка при загрузке API Яндекс.Карт:", error);
    }
  }

  isExistMapInstance() {
    if (!this.instance) {
      console.warn("Карта не инициализирована");
      return false;
    }
    return true;
  }

  @checkMapInstance
  addMark({ id, cords, type: typeMarker, onClick } = {}) {
    const placemark = new window.ymaps.Placemark(
      cords,
      { id },
      {
        balloonLayout: this.getBallonLayout(),
        balloonContentLayout: this.getBallonContent({
          id,
          children: "Загрузка...",
        }),
        hasBalloon: true,
        iconLayout: this.getMarkerLayout(typeMarker),
        iconShape: this.iconShapeCfg,
      }
    );

    placemark.events.add("click", (event) => {
      if (onClick && typeof onClick === "function") onClick(id, event);
    });

    placemark.events.add("balloonopen", () => {
      // Если на карте уже открыт балун, закрываем его
      if (this.currentBalloon) {
        this.currentBalloon.balloon.close();
      }
      // Обновляем ссылку на текущий открытый балун
      this.currentBalloon = placemark;
      this.currentMarkerIdOpen = id;
    });

    placemark.events.add("balloonclose", () => {
      this.currentBalloon = null;
      this.currentMarkerIdOpen = null;
    });

    this.instance.geoObjects.add(placemark);
  }

  handleMarkerClick(id, e) {
    const targetPlacemark = e.get("target");

    if (this.currentBalloon && this.currentMarkerIdOpen === id) return;

    const customEvent = new CustomEvent(yandexMapCustomEventNames.markClicked, {
      detail: {
        id,
        mark: targetPlacemark,
      },
    });

    document.dispatchEvent(customEvent);
  }

  updateBallonContent(id, mark, info) {
    mark.options.set(
      "balloonContentLayout",
      this.getBallonContent({
        id,
        children: `${info}`,
      })
    );
  }

  getLayoutContentForBallon(info) {
    const {
      type,
      title,
      address: { city, house, street },
    } = info;
    const slides = info.images
      .map(
        (image, index) =>
          `<div class="swiper-slide"><img src="${image}" alt="${info.title} - Slide ${index + 1}"></div>`
      )
      .join("");

    return `<div class="swiper">
              <div class="swiper-wrapper">
                ${slides}
              </div>
              <div class="swiper-pagination"></div>
            </div>
            <h3>${title}</h3>
            <div>${this.iconsPresets[type]}</div>
            <p>${city},${street}, ${house}</p>
            `;
  }

  @checkMapInstance
  renderMarks(marks) {
    marks.forEach((mark) => {
      this.addMark({
        id: mark.id,
        cords: mark.cords,
        type: mark.type,
        onClick: (id, e) => {
          this.handleMarkerClick(id, e);
        },
      });
    });
  }

  handleCloseCurrentBallon() {
    if (this.currentBalloon) {
      this.currentBalloon.balloon.close();
    }
    this.currentBalloon = null;
    this.currentMarkerIdOpen = null;
  }

  @checkMapInstance
  centerMapByCords(cords, zoom = 15) {
    try {
      this.instance.setCenter(cords, zoom);
    } catch (e) {
      console.error(e);
    }
  }

  #bindEvents() {
    this.instance.events.add("click", () => {
      this.handleCloseCurrentBallon(); //TODO: а надо ли? надо подумать
    });
  }
}
