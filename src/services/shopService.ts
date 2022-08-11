import { backendApi } from "../api";
import { prepareQueryPagination } from "../helpers";
import {
  BrandResponse,
  ProductPagination,
  ProductResponse,
  StoreResponse,
} from "../interfaces";

const END_POINT_PRODUCT = "/products";
const END_POINT_BRAND = "/brands";
const END_POINT_STORE = "/stores";

export const findAllProducts = async (queryPagination: ProductPagination) => {
  const query = prepareQueryPagination(queryPagination);
  const { data = [] } = await backendApi.get<ProductResponse[]>(
    `${END_POINT_PRODUCT}${query}`
  );
  return data;
};

export const getProductBySlug = async (slug: string) => {
  const { data } = await backendApi.get<ProductResponse>(
    `${END_POINT_PRODUCT}/${slug}`
  );
  return data;
};

export const getBrands = async () => {
  const { data } = await backendApi.get<BrandResponse[]>(`${END_POINT_BRAND}`);
  return data;
};

export const getStores = async () => {
  const { data } = await backendApi.get<StoreResponse[]>(`${END_POINT_STORE}`);
  return data;
};
