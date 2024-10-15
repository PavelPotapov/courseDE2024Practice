const API_ENDPOINTS = {
  posts: {
    news: "newsPosts",
  },
};

const API_URL = process.env.API_URL;

const BASE_URL = window.location.origin;

export { API_ENDPOINTS, API_URL, BASE_URL };
