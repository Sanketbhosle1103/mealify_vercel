import * as yup from "yup";

export const loginValidation = yup.object().shape({
  email: yup
    .string()
    .email("Email format invalid")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
