import * as Yup from "yup";

const detailSchema = Yup.object({
  address: Yup.string().required("An address is required").strict(true),
  bedroom: Yup.number()
    .typeError("Must be a number")
    .required("Number of bedrooms is mandatory")
    .min(0, "Cannot be negative")
    .max(10, "A maximum of 10 is allowed"),
  bathroom: Yup.number()
    .typeError("Must be a number")
    .max(5, "A maximum of 5 is allowed")
    .min(0, "Cannot be negative")
    .required("Number of bathrooms in mandatory"),
  description: Yup.string(),
});

export { detailSchema };
