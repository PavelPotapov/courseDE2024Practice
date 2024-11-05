import "./styles.js";
import { API_URL } from "#shared/config/constants";
import { ApiClient } from "#shared/lib/services/ApiClient.js";
import { StoreService } from "#shared/lib/services/StoreService.js";
import { ChoiceSelectModel } from "#shared/ui/CustomSelect/model";
import { MapApp } from "#widgets/MapApp/model";

async function initMSW() {
  if (process.env.NODE_ENV === "development") {
    const { getMocks } = await import("#shared/api/browser");
    await getMocks();
    console.debug("msw ready");
  } else {
    return Promise.resolve();
  }
}

function domReady() {
  return new Promise((res) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", res);
    } else {
      res();
    }
  });
}

Promise.all([initMSW(), domReady()]).then(() => {
  new ChoiceSelectModel();
  window.App = {};
  window.App.ChoiceSelectModel = ChoiceSelectModel;
  window.App.apiClient = new ApiClient(API_URL);
  window.App.MapApp = new MapApp(new StoreService("MapApp"));
});
