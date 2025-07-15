import axios from "axios";

// dev (staging)
axios.defaults.baseURL = "http://localhost:8080/api/v1";

axios.defaults.headers.common["Content-Type"] = "application/json";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    config.headers.Authorization = "";
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log({ error });
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
      return Promise.reject(error);
    } else {
      return error.response;
    }
  }
);
