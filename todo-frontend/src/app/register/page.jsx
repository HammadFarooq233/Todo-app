"use client";

import { Formik } from "formik";
import { useState } from "react";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { storeToken } from "../utils/storage";
import { registrationSchema } from "../utils/validationSchemas";

import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import UsersApi from "../apis/usersApi";
import { authStateUpdated } from "../slices/authSlice";

function Register() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [error, setError] = useState();

  const { push } = useRouter();

  const handleRegister = async (values) => {
    try {
      const token = await UsersApi.register(values);
      const user = await storeToken(token);

      dispatch(authStateUpdated({ user, token }));

      redirect("/");
    } catch (error) {
      setError(error.response?.data.error);
    }
  };

  if (user) {
    redirect("/");
  }

  return (
    <div className="p-5 w-[100%] min-h-screen bg-white flex justify-center items-center">
      <div className="justify-center items-center w-[100%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] mx-auto">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={registrationSchema}
          onSubmit={async (values) => {
            await handleRegister(values);
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
                {/* Register error */}
                {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}

                <TextInput
                  id={"name"}
                  type={"name"}
                  placeholder={"Name"}
                  onChange={handleChange}
                  value={values["name"]}
                  onBlur={handleBlur}
                />

                {errors["name"] && touched["name"] && (
                  <p className="mt-2 text-red-500 text-sm">{errors["name"]}</p>
                )}

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

                <Button title={"Register"} onClick={handleSubmit} />

                <div
                  className="my-4 flex flex-row gap-x-2 text-sm
                justify-center items-center
                "
                >
                  <p>{"Already have an account?"}</p>

                  <Link href={"/login"}>
                    <p
                      className="font-semibold cursor-pointer hover:underline
                  "
                    >
                      Login
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

export default Register;
