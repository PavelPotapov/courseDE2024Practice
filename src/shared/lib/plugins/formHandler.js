// import { ApiClient } from "../services/ApiClient.js";

import { ModalManager } from "./modalManager.js";

/**
 * Класс для отправки данных с формы
 */
export class FormHandler {
  static instance;

  attrs = {
    form: "data-js-form",
  };

  constructor() {
    if (FormHandler.instance) return FormHandler.instance;
    this.#bindEvents();
    FormHandler.instance = this;
  }

  static getInstance() {
    if (!FormHandler.instance) {
      FormHandler.instance = new FormHandler();
    }
    return FormHandler.instance;
  }

  #handleSubmit(e) {
    const { target, submitter } = e;
    if (!target.hasAttribute(`${this.attrs.form}`)) return;
    if (!target.tagName.toLowerCase() === "form") return;

    const cfg = JSON.parse(target.getAttribute(this.attrs.form));
    const {
      url,
      method = "POST",
      showModalAfterSuccess,
      preventDefault = true,
      redirectUrlAfterSuccess,
      delayBeforeRedirect,
    } = cfg;
    const data = new FormData(target);

    if (preventDefault) {
      e.preventDefault();
    }

    submitter.disabled = true;
    //TODO: а что делать с get запросами?) сериализация в url + лучше использовать APICLIENT
    fetch(url, {
      method,
      body: data,
    })
      .then((res) => {
        if (showModalAfterSuccess) {
          ModalManager.getInstance().closeAll();
          ModalManager.getInstance().open(showModalAfterSuccess, {
            type: "inline",
          });
        }
        if (redirectUrlAfterSuccess) {
          if (delayBeforeRedirect) {
            setTimeout(() => {
              location.href = redirectUrlAfterSuccess;
            }, delayBeforeRedirect);
          } else {
            location.href = redirectUrlAfterSuccess;
          }
        }
      })
      .finally(() => {
        submitter.disabled = false;
      });
  }

  #bindEvents() {
    document.addEventListener(
      "submit",
      (e) => {
        this.#handleSubmit(e);
      },
      true
    );
  }
}
