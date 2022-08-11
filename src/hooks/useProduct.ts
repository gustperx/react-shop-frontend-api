import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { createDateFormString, createUnixFromJsTime } from "../helpers";
import { ProductPagination } from "../interfaces";
import {
  ProductAttributes,
  ProductModel,
} from "../interfaces/product.interface";
import {
  createProductServer,
  deleteProductServer,
  findAllProducts,
  updateProductServer,
  uploadImage,
} from "../services/productService";

const KEY_QUERY = "admin_products";

export const useProduct = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation(createProductServer, {
    onError(error: any, variables, context) {
      handleErrors(error);
    },
    onSuccess(data, variables, context) {
      toast.success("Product created!!");
      queryClient.invalidateQueries([KEY_QUERY, {}]);
    },
  });

  const updateMutation = useMutation(updateProductServer, {
    onError(error: any, variables, context) {
      handleErrors(error);
    },
    onSuccess(data, variables, context) {
      toast.success("Product update!!");
      queryClient.invalidateQueries([KEY_QUERY, {}]);
    },
  });

  const deleteMutation = useMutation(deleteProductServer, {
    onError(error: any, variables, context) {
      handleErrors(error);
    },
    onSuccess(data, variables, context) {
      toast.success("Product deleted!!");
      queryClient.invalidateQueries([KEY_QUERY, {}]);
    },
  });

  const findProducts = (queryPagination: ProductPagination) => {
    return useQuery(
      [KEY_QUERY, queryPagination],
      () => findAllProducts(queryPagination),
      {
        retry: 1,
      }
    );
  };

  const saveProduct = async (data: ProductAttributes) => {
    const date = createDateFormString(data.release_date);
    const unix = createUnixFromJsTime(date.getTime());
    data.release_date = unix;
    if (data.images) {
      data.images = await uploadFiles(data.images);
    }
    createMutation.mutate(data);
  };

  const updateProduct = async (data: ProductModel) => {
    const date = createDateFormString(data.release_date);
    const unix = createUnixFromJsTime(date.getTime());
    data.release_date = unix;
    if (data.images) {
      data.images = await uploadFiles(data.images);
    }
    data.price = Number(data.price);
    updateMutation.mutate(data);
  };

  const uploadFiles = async (file: any) => {
    const url = await uploadImage(file);
    return [url];
  };

  const handleErrors = (error: any) => {
    if (Array.isArray(error.response.data.message)) {
      toast.error(error.response.data.message[0]);
    } else {
      toast.error(error.response.data.message);
    }
  };

  return {
    findProducts,
    saveProduct,
    updateProduct,
    deleteMutation,
  };
};
