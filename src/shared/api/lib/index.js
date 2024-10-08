import { http, HttpResponse, HttpMethods } from "msw"
import { API_URL } from "../../config/constants.js"
import { worker } from "../browser.js"

/**
 * Получает результат запуска MSW
 * @return {Promise.<void|ServiceWorkerRegistration>}
 */
async function getMocks() {
	switch (process.env.NODE_ENV) {
		case "development": // `development` mode
			return await worker.start({
				onUnhandledRequest: "bypass",
			})
		default: // `production` or `test` mode
			return Promise.resolve()
	}
}

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
		throw new Error("Missing endpoint for getResponseMock")
	}

	const url = `${API_URL}/${endpoint}`
	const method = type || "GET"
	const resolver = () => {
		const body = !!resp
			? resp
			: {
					isSuccess: true,
					data,
			  }
		return HttpResponse.json(body)
	}
	switch (method) {
		case HttpMethods.POST:
			return http.post(url, resolver)
		default:
			return http.get(url, resolver)
	}
}

export { getMocks, getResponseMock }
