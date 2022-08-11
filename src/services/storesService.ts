import { securityApi } from "../api/securityApi";
import { StoreAttributes, StoreModel } from "../interfaces/stores.interface";

const END_POINT = "/stores";

export const findAllStores = async () => {
  const { data = [] } = await securityApi.get<StoreModel[]>(`${END_POINT}`);
  return data;
};

export const getStoreById = async (id: string) => {
  try {
    const { data } = await securityApi.get<StoreModel>(`${END_POINT}/${id}`);
    return data;
  } catch (error) {
    return null;
  }
};

export const createStoreServer = async (data: StoreAttributes) => {
  const res = await securityApi.post(`${END_POINT}`, data);
  return res;
};

export const updateStoreServer = async (data: StoreModel) => {
  const { id, ...rest } = data;
  const res = await securityApi.patch(`${END_POINT}/${id}`, rest);
  return res;
};

export const deleteStoreServer = async (id: string) => {
  const res = await securityApi.delete(`${END_POINT}/${id}`);
  return res;
};
