import { FormEvent, useState } from "react";

import { ProductPagination } from "../interfaces";
import { useForm } from "./useForm";

export const useShopPagination = () => {
  const initialPagination: ProductPagination = {
    limit: "8",
    offset: "1",
    productTerm: "",
    productDate: "",
    productStore: "",
    productBrand: "",
  };

  const [pagination, setPagination] = useState<ProductPagination>({});
  const [valuesPagination, setValuesPagination, reset] =
    useForm(initialPagination);

  const handlePagination = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPagination({
      limit: valuesPagination.limit,
      offset: valuesPagination.offset,
      productTerm: valuesPagination.productTerm,
      productDate: valuesPagination.productDate,
      productStore: valuesPagination.productStore,
      productBrand: valuesPagination.productBrand,
    });
  };

  const handleResetPagination = () => {
    setPagination({
      limit: "8",
      offset: "1",
      productTerm: "",
      productDate: "",
      productStore: "",
      productBrand: "",
    });
    reset();
  };

  return {
    pagination,
    handlePagination,
    valuesPagination,
    setValuesPagination,
    handleResetPagination,
  };
};
