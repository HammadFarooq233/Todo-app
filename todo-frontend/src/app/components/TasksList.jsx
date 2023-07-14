import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, selectAllTasks } from "../slices/tasksSlice";
import Task from "./Task";

function TasksList({ todoListVisible }) {
  const tasks = useSelector(selectAllTasks);

  const dispatch = useDispatch();

  const user = useSelector((state) => state?.auth.user);

  useEffect(() => {
    if (!tasks || tasks?.length < 1) {
      dispatch(fetchTasks(user._id));
    }
  }, []);

  return (
    <div
      className={`h-[250px] overflow-y-scroll no-scrollbar transition-all duration-500 ${
        todoListVisible ? "max-h-full" : "max-h-0 overflow-hidden"
      } w-[100%] flex flex-col rounded-lg ${
        tasks.length < 1 && "justify-center items-center bg-white opacity-80"
      } ${tasks.length > 0 && todoListVisible && "py-1"}
    `}
    >
      {tasks.length < 1 ? (
        <p className="font-medium">No task today</p>
      ) : (
        tasks.map((item, index) => (
          <Task
            key={item._id}
            taskId={item._id}
            isFirst={index === 0}
            isLast={index === tasks.length - 1}
          />
        ))
      )}
    </div>
  );
}

export default TasksList;
