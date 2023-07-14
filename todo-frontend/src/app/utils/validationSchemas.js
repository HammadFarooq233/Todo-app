import * as Yup from "yup";

export const todoSchema = Yup.object().shape({
  description: Yup.string()
    .trim()
    .min(1, "Descriptoin must be at least 1 characters long")
    .max(255, "Password cannot be more than 255 characters long")
    .required("Email is required"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(4, "Passwod must be at least 4 characters long")
    .max(12, "Password cannot be more than 12 characters long")
    .required("Password is required"),
});

export const registrationSchema = Yup.object().shape({
  name: Yup.string().max(255).trim().required("Name is required"),
  email: Yup.string()
    .email("Email must be a valid email")
    .required("Email is required"),
  password: Yup.string()
    .trim()
    .min(4, "Passwod must be at least 4 characters long")
    .max(12, "Password cannot be more than 12 characters long")
    .required("Password is required"),
});
