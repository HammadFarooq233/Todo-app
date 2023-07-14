import React from "react";
import ListIcon from "./ListIcon";
import ChevronIcon from "./ChevronIcon";

function TodoDropDown({ onClick, todoListVisible }) {
  return (
    <div
      onClick={onClick}
      className="flex flex-row border-[1.5px] bg-transparent border-gray-400
w-[100%] px-2 py-3 rounded-md
items-center justify-between shadow-lg cursor-pointer mb-[20px]
"
    >
      <div className="flex flex-row items-center gap-x-2">
        <ListIcon />
        <p className="text-white font-semibold">Your todos</p>
      </div>

      <div
        className={`w-[25px] h-[25px] text-white transition-all duration-500 ${
          todoListVisible && "rotate-180"
        } text-white`}
      >
        <ChevronIcon />
      </div>
    </div>
  );
}

export default TodoDropDown;
