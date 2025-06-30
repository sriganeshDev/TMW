import { Get, Post, Put } from "./../index";

export const getSingleProfile = async (id) => {
  return Get({ url: `/project/getSingle-Project/${id}` });
};
export const getAllProjects = async () => {
  return Get({ url: `/project/getAll-Project` });
};
export const getAllProjectNames = async () => {
  return Get({ url: `/project/getAllProject-names` });
};
export const updateProject = async (id, data) => {
  return Put({
    url: `/project/update-Project/${id}`,
    payload: data,
  });
};
export const DeleteProject = async (id) => {
  return Put({
    url: `/project/delete-Project/${id}`,
  });
};

export const createProjects = async (data) => {
  return Post({ url: `/project/createProject`, payload: data });
};
