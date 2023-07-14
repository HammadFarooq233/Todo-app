"use client";

import { useEffect, useState } from "react";
import ProfileImage from "./components/ProfileImage";
import TasksList from "./components/TasksList";
import TodoDropDown from "./components/TodoDropDown";
import TodoTextInput from "./components/TodoTextInput";
import { getToken, getUser, removeToken } from "./utils/storage";

import { redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Button from "./components/Button";
import { authStateUpdated } from "./slices/authSlice";

export default function Home() {
  const [todoListVisible, setTodoListVisible] = useState(true);

  const [isReady, setIsReady] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateUpdated({ user: getUser(), token: getToken() }));
    setIsReady(true);
  }, []);

  if (!isReady) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return redirect("/login");
  } else {
    return (
      <div
        className="bg-[url(../../public/images/image.webp)] h-screen w-[100%] 
      bg-no-repeat bg-cover background-image
      p-5"
      >
        <div className="brightness-100 h-full relative">
          <div
            className="flex mx-auto flex-col h-full
          justify-center items-center w-[100%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%]
          "
          >
            <ProfileImage />

            {/* Logout button */}
            <div className="absolute right-10 top-0">
              <Button
                title={"Logout"}
                onClick={() => {
                  removeToken();
                  dispatch(authStateUpdated({ user: "", token: "" }));
                }}
              />
            </div>

            <TodoTextInput />

            <TodoDropDown
              todoListVisible={todoListVisible}
              onClick={() => setTodoListVisible((prev) => !prev)}
            />

            <TasksList todoListVisible={todoListVisible} />
          </div>
        </div>
      </div>
    );
  }
}
