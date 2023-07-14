import React from "react";

function DeleteTaskButton({ onDelete }) {
  return (
    <div
      className="rounded-lg text-center py-2 bg-red-200 text-red-500 cursor-pointer hover:bg-red-300 text-md font-semibold"
      onClick={onDelete}
    >
      Delete
    </div>
  );
}

export default DeleteTaskButton;
