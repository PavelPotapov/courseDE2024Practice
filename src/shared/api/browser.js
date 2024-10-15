import { setupWorker } from "msw/browser";
import { handlers } from "./index.js";

/**
 * Получает результат запуска MSW
 * @return {Promise.<void|ServiceWorkerRegistration>}
 */
export async function getMocks() {
  switch (process.env.NODE_ENV) {
    case "development": // `development` mode
      return await worker.start({
        onUnhandledRequest: "bypass",
      });
    default: // `production` or `test` mode
      return Promise.resolve();
  }
}

export const worker = setupWorker(...handlers);
