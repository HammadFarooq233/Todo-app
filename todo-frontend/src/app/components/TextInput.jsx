import { Formik } from "formik";
import React, { useRef, useState } from "react";

function TextInput({ placeholder, type, id, value, onChange, onBlur }) {
  const ref = useRef();

  const [isFocused, setIsFocused] = useState(false);

  const handleClick = () => {
    setIsFocused(true);
    setTimeout(() => {
      ref.current?.focus();
    }, 500);
  };

  return (
    <div
      onClick={handleClick}
      className={`border-[1px] border-neutral-400 mt-6 rounded-lg px-2 py-4 flex flex-row items-center cursor-text ${
        isFocused ? "ring-1 ring-black" : "ring-0"
      }
      `}
    >
      <div
        className={`w-full flex flex-row relative top-0 `}
        onClick={handleClick}
      >
        <input
          placeholder={placeholder}
          onChange={onChange}
          id={id}
          name={id}
          ref={ref}
          onBlur={() => setIsFocused(false)}
          type={type}
          onBlurCapture={onBlur}
          value={value}
          className="block ml-2 px-1 w-full focus:outline-none ring-0 py-0 m-0 border-0 "
        />
      </div>
    </div>
  );
}

export default TextInput;
