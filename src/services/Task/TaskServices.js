import { Get, Post, Put } from "./../index";

export const getAllTaskForsingleProj = async (projId, data) => {
  return Get({ url: `/task/get-task-by-proj/${projId}`, payload: data });
};
export const getAllTask = async () => {
  return Get({ url: `/task/getAll-task` });
};
export const getuserTaskForproject = async (projId) => {
  return Get({ url: `/task/user-taskfor-project/${projId}` });
};
export const updateTask = async (id, data) => {
  return Put({
    url: `/task/update-Task/${id}`,
    payload: data,
  });
};
export const deleteTask = async (id) => {
  return Put({
    url: `/task/delete-task/${id}`,
  });
};
export const createTaskForProject = async (data) => {
  return Post({ url: `/task/createTask`, payload: data });
};
// Option 1: If you update backend routes to match
export const getAllTasksForUser = async (data) => {
  return Post({
    url: `/task/user-tasks`, // Matches backend route
    payload: data, // { status: "To do" } or {} for all tasks
  });
};

export const updateTaskStatusForUser = async (data) => {
  return Put({
    url: `/task/user-tasks/status`, // Matches backend route
    payload: data, // { taskId: "abc123", status: "To do" }
  });
};
