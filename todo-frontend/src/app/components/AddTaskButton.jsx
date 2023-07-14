import React from "react";
import PlusIcon from "./PlusIcon";

function AddTaskButton({ onClick }) {
  return (
    <div
      className="p-2 bg-primary-100 hover:bg-primary-200 rounded-lg cursor-pointer"
      onClick={onClick}
    >
      <PlusIcon />
    </div>
  );
}

export default AddTaskButton;
