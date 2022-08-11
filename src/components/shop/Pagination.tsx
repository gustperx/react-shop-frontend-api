import { FC, FormEvent } from "react";
import { useShop } from "../../hooks";
import { ProductPagination } from "../../interfaces";
import { Input } from "../ui";

interface Props {
  handlePagination: (e: FormEvent<HTMLFormElement>) => void;
  handleResetPagination: () => void;
  setValuesPagination: () => void;
  valuesPagination: ProductPagination;
}

export const Pagination: FC<Props> = ({
  handlePagination,
  handleResetPagination,
  setValuesPagination,
  valuesPagination,
}) => {
  const { findBrands, findStores } = useShop();
  const { data: brands = [] } = findBrands();
  const { data: stores = [] } = findStores();

  return (
    <div>
      <form onSubmit={handlePagination}>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="mx-1">
            <Input
              label="Limit"
              type="number"
              placeholder="Limit"
              handleChange={setValuesPagination}
              inputName="limit"
              inputValue={valuesPagination.limit}
              activeError=""
            />
          </div>
          <div className="mx-1">
            <Input
              label="Page"
              type="number"
              placeholder="offset"
              handleChange={setValuesPagination}
              inputName="offset"
              inputValue={valuesPagination.offset}
              activeError=""
            />
          </div>
          <div className="mx-1">
            <Input
              label="Search"
              type="text"
              placeholder="Title / Model"
              handleChange={setValuesPagination}
              inputName="productTerm"
              inputValue={valuesPagination.productTerm}
              activeError=""
            />
          </div>
          <div className="mx-1">
            <Input
              label="Date"
              type="date"
              placeholder=""
              handleChange={setValuesPagination}
              inputName="productDate"
              inputValue={valuesPagination.productDate}
              activeError=""
            />
          </div>
          <div className="mx-1">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Brand</span>
              </label>
              <select
                name="productBrand"
                onChange={setValuesPagination}
                className="select select-bordered w-full"
              >
                <option value=""></option>
                {brands.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mx-1">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Store</span>
              </label>
              <select
                name="productStore"
                onChange={setValuesPagination}
                className="select select-bordered w-full"
              >
                <option value=""></option>
                {stores.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="my-4">
          <button type="submit" className="btn btn-primary mr-2">
            Filter
          </button>
          <button
            onClick={handleResetPagination}
            type="button"
            className="btn btn-secondary"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};
