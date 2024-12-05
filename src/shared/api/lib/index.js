import { http, HttpResponse, HttpMethods } from "msw";
import { API_URL } from "../../config/constants.js";

/**
 * Получает результат ответа MSW
 * @param type{String=} - тип запроса
 * @param resp{Object=} - собственный ответ
 * @param data{Object=} - данные ответа
 * @param endpoint{String} - точка запроса
 * @return {HttpHandler}
 */
function getResponseMock({ type, resp, data, endpoint }) {
  if (!endpoint) {
    throw new Error("Missing endpoint for getResponseMock");
  }

  const url = `${API_URL}/${endpoint}`;
  const method = type || "GET";
  /* eslint-disable @stylistic/js/indent */
  const resolver = () => {
    const body = !!resp
      ? resp
      : {
          isSuccess: true,
          data,
        };
    return HttpResponse.json(body);
  };
  /* eslint-enable @stylistic/js/indent */
  switch (method) {
    case HttpMethods.POST:
      return http.post(url, resolver);
    case HttpMethods.DELETE:
      return http.delete(url, resolver);
    case HttpMethods.PUT:
      return http.put(url, resolver);
    default:
      return http.get(url, resolver);
  }
}

export { getResponseMock };
