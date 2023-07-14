import { api } from "./configs/axiosConfig";

async function addTask(task) {
  const { data } = await api.post("/tasks", task);
  return data;
}

async function updateTask(taskId, task) {
  const { data } = await api.patch(`/tasks/${taskId}/`, task);
  return data;
}

async function deleteTask(taskId) {
  const { data } = await api.delete(`/tasks/${taskId}/`);
  return data;
}

const TasksApi = { addTask, updateTask, deleteTask };

export default TasksApi;
