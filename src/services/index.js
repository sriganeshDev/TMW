import axiosInstance from "./axioInstance";
import { logoutUser } from "../utils/helpers/helperData";

export async function Get(data) {
  const token = localStorage.getItem("token");
  const authToken = token;

  if (authToken)
    axiosInstance.defaults.headers.get["Authorization"] = `Bearer ${authToken}`;
  // console.log(data,"Get data>>");

  return await axiosInstance
    .get(data.url)
    .then((res) => {
      // console.log(res,"resss>>>>sadfsad");
      return res.data;
    })
    .catch((error) => {
      if (error.response?.status === 401) {
        logoutUser();
      }
      return error.response?.data || { message: error.message, status: false };
    });
}

export async function Post(data, contentType) {
  const token = localStorage.getItem("token");
  const authToken = token;

  if (authToken)
    axiosInstance.defaults.headers.post[
      "Authorization"
    ] = `Bearer ${authToken}`;
  // console.log(data,"Post data>>");
  if (contentType)
    axiosInstance.defaults.headers.post["Content-Type"] = contentType;
  else axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
  return await axiosInstance
    .post(data.url, data.payload)
    .then((res) => {
      // console.log(res,"post resss>>>>sadfsad");
      return res.data;
    })
    .catch((error) => {
      console.log(error, "catch resss>>>>sadfsad");
      if (error.response?.status === 401) {
        logoutUser();
      }
      return error.response?.data || { message: error.message, status: false };
    });
}

export async function Delete(data, contentType) {
  const token = localStorage.getItem("token");
  const authToken = token;

  if (authToken)
    axiosInstance.defaults.headers.delete[
      "Authorization"
    ] = `Bearer ${authToken}`;

  if (contentType)
    axiosInstance.defaults.headers.post["Content-Type"] = contentType;
  else axiosInstance.defaults.headers.post["Content-Type"] = "application/json";

  return await axiosInstance
    .delete(data.url, {
      data: data.payload,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error.response?.status === 401) {
        logoutUser();
      }
      return error.response?.data || { message: error.message, status: false };
    });
}

export async function Put(data, contentType) {
  const token = localStorage.getItem("token");
  const authToken = token;

  if (authToken)
    axiosInstance.defaults.headers.put["Authorization"] = `Bearer ${authToken}`;

  if (contentType)
    axiosInstance.defaults.headers.post["Content-Type"] = contentType;
  else axiosInstance.defaults.headers.post["Content-Type"] = "application/json";

  return await axiosInstance
    .put(data.url, data.payload)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error.response?.status === 401) {
        logoutUser();
      }
      return error.response?.data || { message: error.message, status: false };
    });
}

export async function PutFormData(data) {
  const token = localStorage.getItem("token");
  const authToken = token;

  if (authToken)
    axiosInstance.defaults.headers.put["Authorization"] = `Bearer ${authToken}`;

  // Important: Don't set Content-Type for FormData, let browser set it with boundary
  delete axiosInstance.defaults.headers.put["Content-Type"];

  return await axiosInstance
    .put(data.url, data.payload)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error.response?.status === 401) {
        logoutUser();
      }
      return error.response?.data || { message: error.message, status: false };
    });
}
