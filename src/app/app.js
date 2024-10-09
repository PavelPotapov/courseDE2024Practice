import "./styles.js";
import { BASE_URL, API_URL, API_ENDPOINTS } from "#shared/config/constants";

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
  fetch(`${BASE_URL}/${API_URL}/${API_ENDPOINTS.posts.news}`)
    .then((res) => res.json())
    .then((res) => console.debug(res));

  const a = "hu";
  console.debug("Бывает");
});
