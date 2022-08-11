import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { BrandAttributes, BrandModel } from "../interfaces/brand.interface";
import {
  createBrandServer,
  deleteBrandServer,
  findAllBrands,
  updateBrandServer,
} from "../services/brandService";

const KEY_QUERY = "admin_brands";

export const useBrand = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation(createBrandServer, {
    onError(error: any, variables, context) {
      handleErrors(error);
    },
    onSuccess(data, variables, context) {
      toast.success("Brands created!!");
      queryClient.invalidateQueries([KEY_QUERY]);
    },
  });

  const updateMutation = useMutation(updateBrandServer, {
    onError(error: any, variables, context) {
      handleErrors(error);
    },
    onSuccess(data, variables, context) {
      toast.success("Brands update!!");
      queryClient.invalidateQueries([KEY_QUERY]);
    },
  });

  const deleteMutation = useMutation(deleteBrandServer, {
    onError(error: any, variables, context) {
      handleErrors(error);
    },
    onSuccess(data, variables, context) {
      toast.success("Brands deleted!!");
      queryClient.invalidateQueries([KEY_QUERY]);
    },
  });

  const findBrands = () => {
    return useQuery([KEY_QUERY], () => findAllBrands(), {
      retry: 1,
    });
  };

  const saveBrand = async (data: BrandAttributes) => {
    createMutation.mutate(data);
  };

  const updateBrand = async (data: BrandModel) => {
    updateMutation.mutate(data);
  };

  const handleErrors = (error: any) => {
    if (Array.isArray(error.response.data.message)) {
      toast.error(error.response.data.message[0]);
    } else {
      toast.error(error.response.data.message);
    }
  };

  return {
    findBrands,
    saveBrand,
    updateBrand,
    deleteMutation,
  };
};
