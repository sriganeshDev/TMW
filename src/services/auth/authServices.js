import { Post } from "./../index";

export const loginAPI = async (payload) => {
  console.log(payload, "payload>>>>>");

  return Post({ url: `/user/login`, payload });
};
export const RegisterAPI = async (payload) => {
  console.log(payload, "payload>>>>>");

  return Post({ url: `/user/register`, payload });
};
