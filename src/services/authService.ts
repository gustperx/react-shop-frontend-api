import { backendApi } from "../api";
import { securityApi } from "../api/securityApi";
import { AuthLoginValues } from "../interfaces";

const BASE_API = "/auth";

export const authLogin = async (user: AuthLoginValues) => {
  const res = await backendApi.post(`${BASE_API}/login`, user);
  return res;
};

export const checkAuth = async () => {
  const res = await securityApi.get(`${BASE_API}/check-status`);
  return res;
};
