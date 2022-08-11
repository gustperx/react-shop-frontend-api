import { securityApi } from "../api/securityApi";

import { BrandAttributes, BrandModel } from "../interfaces/brand.interface";

const END_POINT = "/brands";

export const findAllBrands = async () => {
  const { data = [] } = await securityApi.get<BrandModel[]>(`${END_POINT}`);
  return data;
};

export const getBrandById = async (id: string) => {
  try {
    const { data } = await securityApi.get<BrandModel>(`${END_POINT}/${id}`);
    return data;
  } catch (error) {
    return null;
  }
};

export const createBrandServer = async (data: BrandAttributes) => {
  const res = await securityApi.post(`${END_POINT}`, data);
  return res;
};

export const updateBrandServer = async (data: BrandModel) => {
  const { id, ...rest } = data;
  const res = await securityApi.patch(`${END_POINT}/${id}`, rest);
  return res;
};

export const deleteBrandServer = async (id: string) => {
  const res = await securityApi.delete(`${END_POINT}/${id}`);
  return res;
};
