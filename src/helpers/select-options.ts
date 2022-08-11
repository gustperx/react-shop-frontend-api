import { BrandResponse, ISelectInput, StoreResponse } from "../interfaces";

export const selectOptions = (
  data: BrandResponse[] | StoreResponse[]
): ISelectInput[] => {
  const options = data.map((item) => ({ label: item.name, value: item.id }));

  return options;
};
