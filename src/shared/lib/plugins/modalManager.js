import { Fancybox } from "@fancyapps/ui";

/**
 * Класс для управления модальными окнами с использованием Fancybox (Singleton).
 */
export class ModalManager {
  static instance = null;

  static selectors = {
    fancyboxContent: ".fancybox__content",
    confirmBtn: "[data-js-confirm-btn]",
    cancelBtn: "[data-js-cancel-btn]",
  };

  constructor(options = {}) {
    if (ModalManager.instance) {
      return ModalManager.instance;
    }

    this.defaultOptions = {
      animationClass: "fade", // Класс для анимации
      overlayColor: "rgba(0, 0, 0, 0.7)", // Цвет подложки
      trapFocus: false, // Настройка фокуса
      defaultType: "html",
      ...options,
    };

    ModalManager.instance = this;
  }

  open(src, options = {}) {
    const finalOptions = {
      ...this.defaultOptions,
      ...options,
    };

    try {
      Fancybox.show([{ src, type: options.type || "html" }], finalOptions);
    } catch (error) {
      console.error("Ошибка при открытии модального окна:", error);
    }
  }

  openConfirmModal({
    message,
    onConfirm = () => {},
    onCancel = () => {},
  } = {}) {
    //TODO: можно вынести в shared/ui/ConfirmModal
    const content = `
      <div class="confirmModal">
        <p>${message}</p>
        <div class="modal-buttons">
          <button data-js-confirm-btn class="btn btn--isConfirm">Да</button>
          <button data-js-cancel-btn class="btn btn--isCancel">Нет</button>
        </div>
      </div>
    `;

    Fancybox.show([{ src: content, type: "html" }], {
      ...this.defaultOptions,
      on: {
        reveal: () => {
          try {
            document
              .querySelector(ModalManager.selectors.fancyboxContent)
              .querySelector(ModalManager.selectors.confirmBtn)
              .addEventListener("click", (e) => {
                console.debug("сonfirm");
                onConfirm();
              });

            document
              .querySelector(ModalManager.selectors.fancyboxContent)
              .querySelector(ModalManager.selectors.cancelBtn)
              .addEventListener("click", (e) => {
                console.debug("cancel");
                onCancel();
              });
          } catch (error) {
            console.error("Ошибка при открытии модального окна:", error);
          }
        },
      },
    });
  }

  closeAll() {
    Fancybox.close();
  }

  static getInstance(options = {}) {
    if (!ModalManager.instance) {
      ModalManager.instance = new ModalManager(options);
    }
    return ModalManager.instance;
  }
}
