import { Dispatch, FC, SetStateAction } from "react";
import { Field, Formik } from "formik";
import { ImageInput } from "formik-file-and-image-input/lib";
import { Input, SelectInput } from "../ui";
import { ProductAttributes } from "../../interfaces/product.interface";

import * as Yup from "yup";
import { es } from "yup-locales";
import { useShop } from "../../hooks";
import { selectOptions } from "../../helpers";
Yup.setLocale(es);

const validchema = Yup.object().shape({
  title: Yup.string().min(1).required(),
  model: Yup.string().min(1).required(),
  price: Yup.number().min(1).required(),
  brand: Yup.string().min(1).required(),
  stores: Yup.array().min(1).required(),
  release_date: Yup.string().min(1).required(),
  images: Yup.mixed(),
});

interface Props {
  handleForm: (data: ProductAttributes) => void;
  formValues: ProductAttributes;
  handleModal: Dispatch<SetStateAction<boolean>>;
}

export const Form: FC<Props> = ({ handleForm, formValues, handleModal }) => {
  const { findBrands, findStores } = useShop();
  const { data: brands = [] } = findBrands();
  const { data: stores = [] } = findStores();
  const brandOptions = selectOptions(brands);
  const storeOptions = selectOptions(stores);

  const handleSubmit = (data: ProductAttributes, actions: any) => {
    handleForm(data);
    actions.resetForm();
    if (!handleModal) return;
    handleModal(false);
  };

  return (
    <Formik
      initialValues={formValues}
      validationSchema={validchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ handleSubmit, values, handleChange, errors }) => (
        <form onSubmit={handleSubmit} className="mx-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex">
              <Input
                label="Title"
                type="text"
                placeholder="Product name"
                handleChange={handleChange}
                inputName="title"
                inputValue={values.title}
                activeError={errors.title}
              />
            </div>
            <div className="flex">
              <Input
                label="Model"
                type="text"
                placeholder="Product model"
                handleChange={handleChange}
                inputName="model"
                inputValue={values.model}
                activeError={errors.model}
              />
            </div>
            <div className="flex">
              <Input
                label="Price"
                type="number"
                placeholder="Product price"
                handleChange={handleChange}
                inputName="price"
                inputValue={values.price}
                activeError={errors.price}
              />
            </div>
            <div className="flex">
              <Input
                label="Date"
                type="date"
                placeholder="Product release"
                handleChange={handleChange}
                inputName="release_date"
                inputValue={values.release_date}
                activeError={errors.release_date}
              />
            </div>
            <div className="flex">
              <Field
                label="Brand"
                activeError={errors.brand}
                className="custom-select"
                name="brand"
                options={brandOptions}
                component={SelectInput}
                placeholder="Select a brand..."
                isMulti={false}
              />
            </div>
            <div className="flex">
              <Field
                label="Stores"
                activeError={errors.stores}
                className="custom-select"
                name="stores"
                options={storeOptions}
                component={SelectInput}
                placeholder="Select multi stores..."
                isMulti={true}
              />
            </div>
            <div className="flex">
              <ImageInput
                name="images"
                validFormats={["image/png", "image/svg", "image/jpeg"]}
              />
            </div>
          </div>
          <div className="flex my-2">
            <button
              type="submit"
              className="btn btn-outline btn-primary btn-wide w-full"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};
