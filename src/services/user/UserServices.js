import { Get, Post, Put, PutFormData } from "./../index";

export const getUserProfile = async () => {
  return Get({ url: `/user/getSingle-User` });
};
export const getUserByUserId = async (userId) => {
  return Get({ url: `/user/getSingle-UserById/${userId}` });
};
export const getAllUser = async (search = "", page = 1, limit = 100) => {
  const params = new URLSearchParams();

  if (search) params.append("search", search);
  params.append("page", page.toString());
  params.append("limit", limit.toString());

  return Get({
    url: `/user/getAll-Users?${params.toString()}`,
  });
};

export const updateUserProfile = async (id, data) => {
  return Put({
    url: `/user/update-profile/${id}`,
    payload: data,
  });
};
export const updateUserProfileWithImage = async (id, formData) => {
  return PutFormData({
    url: `/user/update-profile/${id}`,
    payload: formData,
  });
};
export const DeleteUser = async (id) => {
  return Put({
    url: `/user/delete-user/${id}`,
  });
};

export const getAllUserNames = async () => {
  return Get({ url: `/user/getAll-usersNames` });
};
