const API_ENDPOINTS = {
  config: {
    list: "config/list/",
  },
  marks: {
    list: "marks/list/",
    detail: "marks/detail",
    create: "marks/create/",
    update: "marks/update/",
    delete: "marks/delete",
  },
  routes: {
    list: "routes/list/",
    detail: "routes/detail",
    create: "routes/create/",
    delete: "routes/delete",
  },
};

const API_URL = process.env.API_URL;

const BASE_URL = window.location.origin;

export { API_ENDPOINTS, API_URL, BASE_URL };
