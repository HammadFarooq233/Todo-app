import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TasksApi from "../apis/tasksApi";
import UsersApi from "../apis/usersApi";

const initialState = {
  isLoading: true,
  tasks: [],
  selectedTask: undefined,
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (userId) => {
    return await UsersApi.getTasksByUser(userId);
  }
);

export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
  return await TasksApi.addTask(task);
});

export const updateTask = createAsyncThunk("tasks/updateTask", async (data) => {
  const { taskId, task } = data;
  return await TasksApi.updateTask(taskId, task);
});

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId) => {
    return await TasksApi.deleteTask(taskId);
  }
);

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    taskSelected: (state, action) => {
      state.selectedTask = action.payload;
    },

    taskDeleted: (state, action) => {
      const taskId = action.payload;
      state.tasks = state.tasks?.filter((task) => task._id !== taskId);
    },

    taskUpdated: (state, action) => {
      const { taskId, task } = action.payload;

      const index = state.tasks?.findIndex((task) => task._id === taskId);

      const updatedTask = {
        ...state.tasks[index],
        ...task,
      };

      state.tasks[index] = updatedTask;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        console.log("fetchTasks.fulfilled");
        console.log(action.payload);

        state.tasks = action.payload;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;

        const index = state.tasks?.findIndex(
          (task) => task._id === updatedTask._id
        );

        state.tasks[index] = updatedTask;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks?.filter(
          (task) => task._id !== action.payload
        );
      });
  },
});

// Action creators are generated for each case reducer function
export const { taskSelected, taskDeleted, taskUpdated } = tasksSlice.actions;

export default tasksSlice.reducer;

// Selector functions for tasks slice
export const selectAllTasks = (state) => {
  return state?.tasks?.tasks;
};

export const selectTask = (state, taskId) => {
  return state?.tasks?.tasks?.find((task) => task._id === taskId);
};
