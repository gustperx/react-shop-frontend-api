import { Pagination, ProductList } from "../../components/shop";
import { Alert } from "../../components/ui";
import { useShop, useShopPagination } from "../../hooks";

export const HomePage = () => {
  const { findProducts } = useShop();
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
      ) : (products && products.length) > 0 ? (
        <ProductList products={products} />
      ) : (
        <Alert message="No products" alert="alert-error" />
      )}
    </>
  );
};
