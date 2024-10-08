import { getResponseMock } from "./lib/index.js"
import { API_ENDPOINTS } from "../config/constants.js"

export const handlers = [
	getResponseMock({
		type: "GET",
		endpoint: API_ENDPOINTS.posts.news,
		data: {
			items: ["Hello world!"],
		},
	}),
]
