import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../slices/tasksSlice";
import { todoSchema } from "../utils/validationSchemas";
import AddTaskButton from "./AddTaskButton";

function TodoTextInput() {
  const selectedTask = useSelector((state) => state?.tasks?.selectedTask);
  const [description, setDescription] = useState(selectedTask?.description);

  const dispatch = useDispatch();

  useEffect(() => {
    setDescription(
      selectedTask?.description === undefined ? "" : selectedTask?.description
    );
  }, [selectedTask]);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        description,
      }}
      validationSchema={todoSchema}
      onSubmit={async (values) => {
        selectedTask?.description
          ? dispatch(
              updateTask({
                taskId: selectedTask?._id,
                task: {
                  description,
                },
              })
            )
          : dispatch(addTask({ description }));
      }}
    >
      {({ handleChange, handleSubmit, values, errors }) => {
        return (
          <>
            <div
              className={`flex flex-row bg-white w-[100%] pl-4 pr-2 py-1.5 rounded-lg justify-between items-center mb-[20px] ${
                errors["description"] && "ring-4 ring-red-700"
              }`}
            >
              <input
                name="description"
                type="text"
                value={description}
                placeholder="Add new"
                className="w-[90%] py-1 focus:outline-none"
                onChange={(e) => {
                  handleChange(e);
                  setDescription(e.currentTarget?.value);
                }}
                max={255}
              />

              <AddTaskButton onClick={handleSubmit} />
            </div>
          </>
        );
      }}
    </Formik>
  );
}

export default TodoTextInput;
