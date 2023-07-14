import CheckCircleIcon from "./CheckCircleIcon";
import DeleteTaskButton from "./DeleteTaskButton";

import DotIcon from "./DotIcon";

import { FaRegCircleCheck } from "react-icons/fa6";

import { BiSolidShow } from "react-icons/bi";

import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  selectTask,
  taskDeleted,
  taskSelected,
  taskUpdated,
  updateTask,
} from "../slices/tasksSlice";
import moment from "moment/moment";

function Task({ taskId, isFirst, isLast }) {
  const dispatch = useDispatch();

  const selectedTask = useSelector((state) => state.tasks.selectedTask);
  const task = useSelector((state) => selectTask(state, taskId));

  return (
    <div className="group">
      <div
        className={`
        ${isFirst && "rounded-tl-lg rounded-tr-lg"}
        ${isLast && "rounded-bl-lg rounded-br-lg"}
        opacity-80 bg-white flex flex-row bg-transparent justify-between items-center border-b-[1.5px] border-neutral-400 px-3 py-4`}
      >
        <div className="flex flex-row gap-x-2 items-center">
          <div className="w-[25px] h-[25px] cursor-pointer hover:opacity-70">
            {task.status === "completed" ? (
              <div
                onClick={() => {
                  dispatch(
                    updateTask({
                      taskId: task._id,
                      task: { status: "pending" },
                    })
                  );
                }}
              >
                <CheckCircleIcon />
              </div>
            ) : (
              <FaRegCircleCheck
                size={"20px"}
                onClick={() => {
                  dispatch(
                    updateTask({
                      taskId: task._id,
                      task: { status: "completed" },
                    })
                  );
                }}
              />
            )}
          </div>

          <p className="font-medium">{task.description}</p>
        </div>

        <div className="flex flex-row gap-x-4">
          <AiOutlineEdit
            size={"22.5px"}
            className="hidden group-hover:inline-block cursor-pointer text-neutral-700 hover:opacity-60"
            onClick={() => dispatch(taskSelected(task))}
          />

          <BiSolidShow
            size={"25px"}
            className="hidden group-hover:inline-block cursor-pointer text-neutral-700 hover:opacity-60"
            onClick={() =>
              selectedTask?._id === task._id
                ? dispatch(taskSelected(""))
                : dispatch(taskSelected(task))
            }
          />

          <div className="cursor-grab">
            <DotIcon />
          </div>
        </div>
      </div>

      {/* Task details */}
      <div
        className={` 
        ${isLast && "rounded-bl-lg rounded-br-lg"}
        transition-all duration-700
        overflow-hidden  ${
          selectedTask?._id === task._id ? "max-h-[200px] py-4" : "max-h-0"
        } px-3 bg-white flex flex-col gap-y-1`}
      >
        <div className="flex gap-x-2 mt- 5">
          <p className="font-bold text-lg">Completed: </p>

          <p className="text-lg font-normal">
            {task.status === "completed" ? "Completed" : "Not Completed"}
          </p>
        </div>

        <div className="flex gap-x-2 my-2">
          <p className="font-bold text-lg">Created At: </p>

          <p className="text-lg font-normal">
            {`${moment(task.createdAt).format("MM/DD/YYYY")}, ${moment(
              task.createdAt
            ).format("LT")}`}
          </p>
        </div>

        <DeleteTaskButton
          onDelete={() => {
            dispatch(taskSelected(""));
            dispatch(deleteTask(task._id));
          }}
        />
      </div>
    </div>
  );
}

export default Task;
