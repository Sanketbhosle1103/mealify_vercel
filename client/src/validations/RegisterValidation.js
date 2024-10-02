import * as yup from "yup";

export const registerValidation = yup.object().shape({
  name: yup.string().required("Name is Required"),
  email: yup
    .string()
    .email("Email format invalid")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum length should be 6")
    .required("Password is required"),
  phone: yup
    .string()
    .matches(/^[6-9]\d{9}$/, "Phone number is not valid")
    .required("Phone number is required"),
});
