import { useState } from "react";
import { Formik } from "formik";

import { Input } from "../../components/ui";

import * as Yup from "yup";
import { es } from "yup-locales";
Yup.setLocale(es);

import { AuthLoginValues } from "../../interfaces";
import { useAuth } from "../../hooks";

const logInSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
});

const initialValues: AuthLoginValues = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const { loginUser } = useAuth();

  const handleSubmit = async (values: AuthLoginValues) => {
    setLoading(true);
    const resp = await loginUser(values);
    if (resp?.error) {
      setError(resp.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <h1 className="text-2xl font-bold mb-4">Log in</h1>
      </div>
      <div className="mb-4">
        <p className="text-red-500 font-semibold">{error}</p>
        <p className="text-green-500 font-semibold">
          {loading ? "Realizando autenticación espere..." : ""}
        </p>
      </div>
      <div className="w-full md:w-2/6">
        <Formik
          initialValues={initialValues}
          validationSchema={logInSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, values, handleChange, errors }) => (
            <form onSubmit={handleSubmit} className="mx-4">
              <div className="flex">
                <Input
                  label="Email"
                  type="email"
                  placeholder="hello@example.com"
                  handleChange={handleChange}
                  inputName="email"
                  inputValue={values.email}
                  activeError={errors.email}
                />
              </div>
              <div className="flex">
                <Input
                  label="Password"
                  type="password"
                  placeholder="******"
                  inputName="password"
                  handleChange={handleChange}
                  inputValue={values.password}
                  activeError={errors.password}
                />
              </div>
              <div className="flex my-2">
                <button
                  type="submit"
                  className="btn btn-outline btn-primary btn-wide w-full"
                  disabled={loading}
                >
                  Log in
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
