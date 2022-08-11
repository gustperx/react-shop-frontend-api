import { securityApi } from "../api/securityApi";
import { prepareQueryPagination } from "../helpers";
import { ProductPagination, ProductResponse } from "../interfaces";
import {
  ProductAttributes,
  ProductModel,
} from "../interfaces/product.interface";

const END_POINT = "/products";

export const findAllProducts = async (queryPagination: ProductPagination) => {
  const query = prepareQueryPagination(queryPagination);
  const { data = [] } = await securityApi.get<ProductResponse[]>(
    `${END_POINT}${query}`
  );
  return data;
};

export const getProductBySlug = async (slug: string) => {
  const { data } = await securityApi.get<ProductResponse>(
    `${END_POINT}/${slug}`
  );
  return data;
};

export const uploadImage = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await securityApi.post("/files/product", formData);
    return data.secureUrl;
  } catch (error) {
    return null;
  }
};

export const createProductServer = async (data: ProductAttributes) => {
  const res = await securityApi.post(`${END_POINT}`, data);
  return res;
};

export const updateProductServer = async (data: ProductModel) => {
  const { id, ...rest } = data;

  const res = await securityApi.patch(`${END_POINT}/${id}`, rest);
  return res;
};

export const deleteProductServer = async (id: string) => {
  const res = await securityApi.delete(`${END_POINT}/${id}`);
  return res;
};

export const getProductById = async (id: string) => {
  try {
    const { data } = await securityApi.get<ProductResponse>(
      `${END_POINT}/${id}`
    );
    return data;
  } catch (error) {
    return null;
  }
};
