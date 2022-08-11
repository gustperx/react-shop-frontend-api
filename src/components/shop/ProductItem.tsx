import { FC } from "react";
import { getDayMonthYearHoursMinutes } from "../../helpers";
import { ProductResponse } from "../../interfaces";

interface Props {
  product: ProductResponse;
}

export const ProductItem: FC<Props> = ({ product }) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <div className="basis-4/12">
          <figure>
            <img
              className="object-cover h-96 w-full"
              src={product.images[0] || "https://dummyimage.com/500x1720"}
              alt={product.title}
            />
          </figure>
        </div>
        <div className="basis-8/12">
          <div className="p-8">
            <h1 className="text-xl font-semibold md:text-2xl">
              {product.title}
            </h1>
            <p className="text-md my-2">
              <span className="font-semibold">Brand:</span>{" "}
              {product.brand ? product.brand.name : ""}
            </p>
            <p className="text-md my-2">
              <span className="font-semibold">Model:</span> {product.model}
            </p>
            <p className="text-md my-2">
              <span className="font-semibold">Price:</span> $ {product.price}
            </p>
            <p className="text-md my-2">
              <span className="font-semibold">Release:</span>{" "}
              {getDayMonthYearHoursMinutes(product.release_date)}
            </p>
            <p className="text-md mt-4 mb-2 font-semibold">Stores:</p>
            <div>
              {product.stores.map((store) => (
                <a href={store.url} key={store.name} target="_black">
                  <div className="badge badge-outline mr-2">{store.name}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      {product.description && (
        <div className="mt-12 mx-4">
          <h3 className="text-lg font-semibold my-6">Description:</h3>
          <p>{product.description}</p>
        </div>
      )}
    </>
  );
};
