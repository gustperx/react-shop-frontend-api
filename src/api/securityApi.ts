import axios from "axios";

const securityApi = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_HOST,
});

securityApi.interceptors.request.use((config: any) => {
  config.headers.common.Authorization = `Bearer ${sessionStorage.getItem(
    "idToken"
  )}`;

  return config;
});

export { securityApi };
