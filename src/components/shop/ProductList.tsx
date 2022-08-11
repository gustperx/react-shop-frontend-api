import { FC } from "react";
import { Link } from "react-router-dom";
import { ProductResponse } from "../../interfaces";
import { Cart } from "./Cart";

interface Props {
  products: ProductResponse[];
}

export const ProductList: FC<Props> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Link key={product.id} to={`/product/${product.slug.toLowerCase()}`}>
          <Cart product={product} />
        </Link>
      ))}
    </div>
  );
};
