import { getResponseMock } from "./lib/index.js";
import { API_ENDPOINTS } from "../config/constants.js";
import {
  listMarsMockResponse as listMarks,
  markDetail,
} from "#widgets/MapApp/api/mockData.js";

export const handlers = [
  getResponseMock({
    type: "GET",
    endpoint: API_ENDPOINTS.marks.list,
    data: listMarks,
  }),
  getResponseMock({
    type: "GET",
    endpoint: `${API_ENDPOINTS.marks.detail}?1`,
    data: markDetail["1"],
  }),
  getResponseMock({
    type: "GET",
    endpoint: `${API_ENDPOINTS.marks.detail}?2`,
    data: markDetail["2"],
  }),
];
