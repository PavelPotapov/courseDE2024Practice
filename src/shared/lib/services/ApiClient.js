/**
 *
 */
export class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  // Преобразование объекта параметров в строку запроса
  serializeParams(params) {
    return new URLSearchParams(params).toString();
  }

  //TODO: скорее всего это лучше преобразовать в switch case
  async #handleResponse(response) {
    const contentType = response.headers.get("Content-Type");

    let responseData;
    if (contentType.includes("application/json")) {
      responseData = await response.json();
    } else if (
      contentType.includes("text/plain") ||
      contentType.includes("text/html")
    ) {
      responseData = await response.text();
    } else if (
      contentType.includes("application/xml") ||
      contentType.includes("text/xml")
    ) {
      responseData = await response.text(); // Можно использовать XMLParser для парсинга
    } else if (
      contentType.includes("image/") ||
      contentType.includes("application/octet-stream")
    ) {
      responseData = await response.blob(); // Для изображений или бинарных данных
    } else {
      responseData = await response.text();
    }

    return responseData;
  }

  async request(
    endpoint,
    method = "GET",
    body = null,
    headers = {},
    contentType = "application/json"
  ) {
    //Формируем полный URL запроса
    const url = `${this.baseURL}/${endpoint}`;
    const options = {
      method,
      headers: {
        "Content-Type": contentType,
        ...headers,
      },
    };

    if (body) {
      switch (contentType) {
        case "application/json":
          options.body = JSON.stringify(body);
          break;
        default:
          options.body = body;
      }
    }

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      return this.#handleResponse(response);
    } catch (e) {
      console.error(e);
    }
  }

  get(endpoint, params = {}, headers = {}, contentType = "application/json") {
    const queryString = this.serializeParams(params);
    const urlWithParams = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(urlWithParams, "GET", null, headers, contentType);
  }

  post(endpoint, body, headers = {}, contentType = "application/json") {
    return this.request(endpoint, "POST", body, headers, contentType);
  }

  put(endpoint, body, headers = {}, contentType = "application/json") {
    return this.request(endpoint, "PUT", body, headers, contentType);
  }

  delete(endpoint, headers = {}, contentType = "application/json") {
    return this.request(endpoint, "DELETE", null, headers, contentType);
  }
}
