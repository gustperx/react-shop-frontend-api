import { FC } from "react";
import { getDayMonthYearHoursMinutes } from "../../helpers";
import { ProductResponse } from "../../interfaces";

interface Props {
  product: ProductResponse;
}

export const Cart: FC<Props> = ({ product }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img
          className="object-cover h-48 w-96"
          src={product.images[0] || "https://dummyimage.com/1200x720"}
          alt={product.title}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-sm">{product.title}</h2>
        <p className="text-sm">
          Brand: {product.brand ? product.brand.name : ""}
        </p>
        <p className="text-sm">Model: {product.model}</p>
        <p className="text-sm">Price: $ {product.price}</p>
        <p className="text-sm">
          Release: {getDayMonthYearHoursMinutes(product.release_date)}
        </p>
      </div>
    </div>
  );
};
