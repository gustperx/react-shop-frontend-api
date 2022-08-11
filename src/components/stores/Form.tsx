import { Dispatch, FC, SetStateAction } from "react";
import { Formik } from "formik";

import { Input } from "../ui";

import { StoreAttributes } from "../../interfaces/stores.interface";

import * as Yup from "yup";
import { es } from "yup-locales";
Yup.setLocale(es);

const validchema = Yup.object().shape({
  name: Yup.string().min(1).required(),
  url: Yup.string().url().min(1).required(),
});

interface Props {
  handleForm: (data: StoreAttributes) => void;
  formValues: StoreAttributes;
  handleModal: Dispatch<SetStateAction<boolean>>;
}

export const Form: FC<Props> = ({ handleForm, formValues, handleModal }) => {
  const handleSubmit = (data: StoreAttributes, actions: any) => {
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
          <div className="grid grid-cols-1 gap-2">
            <div className="flex">
              <Input
                label="Name"
                type="text"
                placeholder="Store name"
                handleChange={handleChange}
                inputName="name"
                inputValue={values.name}
                activeError={errors.name}
              />
            </div>
            <div className="flex">
              <Input
                label="URL"
                type="text"
                placeholder="Store URL"
                handleChange={handleChange}
                inputName="url"
                inputValue={values.url}
                activeError={errors.url}
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
