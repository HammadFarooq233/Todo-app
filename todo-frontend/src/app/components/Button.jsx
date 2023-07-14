import React from "react";

function Button({ title, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`my-5 p-3 rounded-lg flex text-center items-center font-semibold bg-opacity-90 bg-black text-white hover:bg-opacity-80 cursor-pointer`}
    >
      <p className="block mx-auto">{title}</p>
    </div>
  );
}

export default Button;
