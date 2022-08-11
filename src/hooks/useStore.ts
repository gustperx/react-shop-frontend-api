import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { StoreAttributes, StoreModel } from "../interfaces/stores.interface";
import {
  createStoreServer,
  deleteStoreServer,
  findAllStores,
  updateStoreServer,
} from "../services/storesService";

const KEY_QUERY = "admin_stores";

export const useStore = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation(createStoreServer, {
    onError(error: any, variables, context) {
      handleErrors(error);
    },
    onSuccess(data, variables, context) {
      toast.success("Store created!!");
      queryClient.invalidateQueries([KEY_QUERY]);
    },
  });

  const updateMutation = useMutation(updateStoreServer, {
    onError(error: any, variables, context) {
      handleErrors(error);
    },
    onSuccess(data, variables, context) {
      toast.success("Store update!!");
      queryClient.invalidateQueries([KEY_QUERY]);
    },
  });

  const deleteMutation = useMutation(deleteStoreServer, {
    onError(error: any, variables, context) {
      handleErrors(error);
    },
    onSuccess(data, variables, context) {
      toast.success("Store deleted!!");
      queryClient.invalidateQueries([KEY_QUERY]);
    },
  });

  const findStores = () => {
    return useQuery([KEY_QUERY], () => findAllStores(), {
      retry: 1,
    });
  };

  const saveStore = async (data: StoreAttributes) => {
    createMutation.mutate(data);
  };

  const updateStore = async (data: StoreModel) => {
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
    findStores,
    saveStore,
    updateStore,
    deleteMutation,
  };
};
