import { TableList } from "../../components/brand";
import { Alert } from "../../components/ui";
import { useBrand } from "../../hooks";

export const BrandPage = () => {
  const { findBrands } = useBrand();

  const { data: brands = [], isLoading } = findBrands();

  return (
    <>
      {isLoading ? (
        <Alert message="Loading brands.. Please wait" alert="alert-success" />
      ) : (
        <TableList brands={brands} />
      )}
    </>
  );
};
