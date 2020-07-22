import React, { useEffect, useRef } from "react";
import { formValues } from "./InitialStep";
import { Formik } from "formik";
import * as schema from "./schema/validationSchema";
import GooglePlacesAutoComplete from "./components/GooglePlacesInput";
import FieldErrorMessage from "./components/FieldErrorMessage";

interface IProps {
  setStep: (step: number) => void;
  initialValues: formValues;
  setInitialValues: (values: formValues) => void;
}

const DetailStep: React.FC<IProps> = ({
  setStep,
  initialValues,
  setInitialValues,
}) => {
  const formRef = useRef(null);

  useEffect(() => {
    if (initialValues.fromCsv) {
      if (formRef && formRef.current) {
        //@ts-ignore
        formRef.current.validateForm();
      }
    }
  }, [initialValues]);
  return (
    <Formik
      initialTouched={
        initialValues.fromCsv
          ? {
              bathroom: true,
              bedroom: true,
              address: true,
            }
          : {}
      }
      innerRef={formRef}
      initialValues={initialValues}
      enableReinitialize
      validateOnBlur={true}
      validateOnChange={true}
      onSubmit={(values) => {
        setInitialValues(values);
        setStep(2);
      }}
      validationSchema={schema.detailSchema}
    >
      {({
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        values,
        errors,
        touched,
      }) => {
        const disabled =
          Object.keys(errors).length > 0 || Object.keys(touched).length === 0;
        return (
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form onSubmit={handleSubmit}>
                <div className="mt-6">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Address
                    <span className="text-red-700">*</span>
                  </label>
                  <div className="mt-1 rounded-md shadow-sm relative">
                    <GooglePlacesAutoComplete
                      name="address"
                      onBlur={setFieldTouched}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      placeholder="Salt lake, Bahamas"
                      value={values.address}
                      onPlaceSelect={setFieldValue}
                    />
                    {errors.address && touched.address && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-red-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  {errors.address && touched.address && (
                    <FieldErrorMessage error={errors.address} />
                  )}
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="bedroom"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Bedroom
                    <span className="text-red-700">*</span>
                  </label>
                  <div className="mt-1 rounded-md shadow-sm relative">
                    <input
                      id="bedroom"
                      onChange={(e) => {
                        setFieldValue("bedroom", e.target.value);
                      }}
                      onBlur={() => setFieldTouched("bedroom")}
                      type="text"
                      autoComplete="off"
                      value={values.bedroom}
                      className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue  transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${
                        errors.bedroom && touched.bedroom
                          ? "focus:border-red-300"
                          : "focus:border-blue-300"
                      }`}
                    />
                    {errors.bedroom && touched.bedroom && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-red-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  {errors.bedroom && touched.bedroom && (
                    <FieldErrorMessage error={errors.bedroom} />
                  )}
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="bathroom"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Bathroom
                    <span className="text-red-700">*</span>
                  </label>
                  <div className="mt-1 rounded-md shadow-sm relative">
                    <input
                      id="bathroom"
                      type="text"
                      autoComplete="off"
                      onBlur={() => setFieldTouched("bathroom")}
                      className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue  transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${
                        errors.bathroom && touched.bathroom
                          ? "focus:border-red-300"
                          : "focus:border-blue-300"
                      }`}
                      onChange={(e) => {
                        setFieldValue("bathroom", e.target.value);
                      }}
                      value={values.bathroom}
                    />
                    {errors.bathroom && touched.bathroom && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-red-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  {errors.bathroom && touched.bathroom && (
                    <FieldErrorMessage error={errors.bathroom} />
                  )}
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Description
                  </label>
                  <div className="mt-1 rounded-md shadow-sm">
                    <textarea
                      id="about"
                      placeholder="Description of an ideal house in brief"
                      rows={3}
                      onChange={(e) =>
                        setFieldValue("description", e.target.value)
                      }
                      value={values.description}
                      className="form-textarea appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    ></textarea>
                  </div>
                </div>

                <div className="mt-3 text-sm leading-5">
                  <span
                    onClick={() => setStep(0)}
                    className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500 transition ease-in-out duration-150"
                  >
                    &larr; Go back to the previous page
                  </span>
                </div>
                <div className="mt-6">
                  <span className="block w-full rounded-md shadow-sm">
                    <button
                      type="submit"
                      disabled={disabled}
                      className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 
                      ${
                        disabled ? "disable" : ""
                      } transition duration-150 ease-in-out $`}
                    >
                      Continue
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default DetailStep;
