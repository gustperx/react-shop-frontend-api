import { ProductPagination } from "../interfaces";
import { createDateFormString, createUnixFromJsTime } from "./unix-to-date";

export const prepareQueryPagination = (queryPagination: ProductPagination) => {
  const {
    limit = "8",
    offset = "1",
    productTerm = "",
    productDate = "",
    productBrand = "",
    productStore = "",
  } = queryPagination;

  let query = "";

  if (limit && Number(limit) > 0) {
    query += `?limit=${limit}`;
  } else {
    query += `?limit=8`;
  }

  if (offset && Number(offset) >= 1) {
    query += `&offset=${Number(offset) - 1}`;
  } else {
    query += `&offset=0`;
  }

  if (productTerm) {
    query += `&productTerm=${encodeURI(productTerm)}`;
  }

  if (productDate) {
    const date = createDateFormString(productDate);
    const unix = createUnixFromJsTime(date.getTime());
    query += `&productDate=${unix}`;
  }

  if (productBrand) {
    query += `&productBrand=${productBrand}`;
  }

  if (productStore) {
    query += `&productStore=${productStore}`;
  }

  return query;
};
