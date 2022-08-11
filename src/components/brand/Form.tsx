import { Dispatch, FC, SetStateAction } from "react";
import { Formik } from "formik";

import { Input } from "../ui";
import { BrandAttributes } from "../../interfaces/brand.interface";

import * as Yup from "yup";
import { es } from "yup-locales";
Yup.setLocale(es);

const validchema = Yup.object().shape({
  name: Yup.string().min(1).required(),
});

interface Props {
  handleForm: (data: BrandAttributes) => void;
  formValues: BrandAttributes;
  handleModal: Dispatch<SetStateAction<boolean>>;
}

export const Form: FC<Props> = ({ handleForm, formValues, handleModal }) => {
  const handleSubmit = (data: BrandAttributes, actions: any) => {
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
                placeholder="Brand name"
                handleChange={handleChange}
                inputName="name"
                inputValue={values.name}
                activeError={errors.name}
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
