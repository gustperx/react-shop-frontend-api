import { useQuery } from "@tanstack/react-query";

import { ProductPagination } from "../interfaces";
import {
  findAllProducts,
  getBrands,
  getProductBySlug,
  getStores,
} from "../services/shopService";

const KEY_QUERY = "products";
const KEY_QUERY_BRAND = "brands";
const KEY_QUERY_STORE = "sotres";

export const useShop = () => {
  const findProducts = (queryPagination: ProductPagination) => {
    return useQuery(
      [KEY_QUERY, queryPagination],
      () => findAllProducts(queryPagination),
      {
        retry: 1,
      }
    );
  };

  const findProductBySlug = (slug: string) => {
    return useQuery([KEY_QUERY, slug], () => getProductBySlug(slug), {
      retry: 1,
    });
  };

  const findBrands = () => {
    return useQuery([KEY_QUERY_BRAND], getBrands, {
      cacheTime: 60000,
    });
  };

  const findStores = () => {
    return useQuery([KEY_QUERY_STORE], getStores, {
      cacheTime: 60000,
    });
  };

  return {
    findProducts,
    findProductBySlug,
    findBrands,
    findStores,
  };
};
