"use client";

import { Formik } from "formik";
import { useState } from "react";
import AuthApi from "../apis/authApi";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { storeToken } from "../utils/storage";
import { loginSchema } from "../utils/validationSchemas";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { authStateUpdated } from "../slices/authSlice";

function Login() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [error, setError] = useState();

  const handleLogin = async (values) => {
    try {
      const token = await AuthApi.login(values);
      const user = await storeToken(token);

      dispatch(authStateUpdated({ user, token }));

      redirect("/");
    } catch (error) {
      setError(error.response?.data.error);
    }
  };

  if (user) {
    return redirect("/");
  }

  return (
    <div className="p-5 w-[100%] min-h-screen bg-white flex justify-center items-center">
      <div className="justify-center items-center w-[100%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] mx-auto">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={async (values) => {
            await handleLogin(values);
          }}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            handleBlur,
          }) => {
            return (
              <>
                {/* Login error */}
                {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}

                <TextInput
                  id={"email"}
                  type={"email"}
                  placeholder={"Email"}
                  onChange={handleChange}
                  value={values["email"]}
                  onBlur={handleBlur}
                />

                {errors["email"] && touched["email"] && (
                  <p className="mt-2 text-red-500 text-sm">{errors["email"]}</p>
                )}

                <TextInput
                  id={"password"}
                  type={"password"}
                  placeholder={"Password"}
                  onChange={handleChange}
                  value={values["password"]}
                  onBlur={handleBlur}
                />

                {errors["password"] && touched["email"] && (
                  <p className="mt-2 text-red-500 text-sm">
                    {errors["password"]}
                  </p>
                )}

                <div className="flex flex-row-reverse">
                  <p className="hover font-semibold text-black text-sm hover:underline cursor-pointer mt-4 mb-1">
                    Forgot password?
                  </p>
                </div>

                <Button title={"Login"} onClick={handleSubmit} />

                <div className="my-4 flex flex-row gap-x-2 text-sm justify-center items-center">
                  <p>{"Don't have an account?"}</p>

                  <Link href={"/register"}>
                    <p className="font-semibold cursor-pointer hover:underline">
                      Register
                    </p>
                  </Link>
                </div>
              </>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
