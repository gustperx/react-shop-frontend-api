import { useParams } from "react-router-dom";
import { ProductItem } from "../../components/shop";
import { Alert } from "../../components/ui";
import { useShop } from "../../hooks";

export const SimpleProductPage = () => {
  const { slug = "" } = useParams();
  const { findProductBySlug } = useShop();
  const { data: product, isLoading, isError } = findProductBySlug(slug);

  return (
    <>
      {isLoading ? (
        <Alert message="Loading product.. Please wait" alert="alert-success" />
      ) : isError ? (
        <Alert message="NO PRODUCT" alert="alert-error" />
      ) : (
        <ProductItem product={product} />
      )}
    </>
  );
};
