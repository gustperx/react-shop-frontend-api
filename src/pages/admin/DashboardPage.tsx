import { TableList } from "../../components/product";
import { Pagination } from "../../components/shop";
import { Alert } from "../../components/ui";
import { useProduct, useShopPagination } from "../../hooks";

export const DashboardPage = () => {
  const { findProducts } = useProduct();
  const {
    pagination,
    handlePagination,
    valuesPagination,
    setValuesPagination,
    handleResetPagination,
  } = useShopPagination();
  const { data: products = [], isLoading } = findProducts(pagination);

  return (
    <>
      <Pagination
        handlePagination={handlePagination}
        valuesPagination={valuesPagination}
        setValuesPagination={setValuesPagination}
        handleResetPagination={handleResetPagination}
      />

      {isLoading ? (
        <Alert message="Loading products.. Please wait" alert="alert-success" />
      ) : (
        <TableList products={products} />
      )}
    </>
  );
};
