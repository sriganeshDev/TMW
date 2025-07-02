import { AlertCircle, CheckCircle2, Circle } from "lucide-react";
import React from "react";

export const logoutUser = () => {
  localStorage.clear();
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("userId");

  window.location.href = "/";
};

export const statusOptions = [
  {
    value: "To Do",
    label: "To Do",
    color: "bg-cyan-100 text-cyan-800",
    dotColor: "bg-cyan-500",
  },
  {
    value: "In Progress",
    label: "In Progress",
    color: "bg-purple-100 text-purple-800",
    dotColor: "bg-purple-500",
  },
  {
    value: "Done",
    label: "Done",
    color: "bg-green-100 text-green-800",
    dotColor: "bg-green-500",
  },
];

export const statusOption = [
  { value: "To do", label: "To Do" },
  { value: "In Progress", label: "In Progress" },
  { value: "Completed", label: "Completed" },
];

export const priorityOptions = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

export const pipelineOptions = [
  { value: "Develop", label: "Develop" },
  { value: "Completed", label: "Completed" },
];

// <-------------- bg colors  Stat card  fo r DashBoard --------------->
export const bgVariants = {
  "text-blue-600": "bg-blue-600/10",
  "text-green-600": "bg-green-600/10",
  "text-purple-600": "bg-purple-600/10",
  "text-orange-600": "bg-orange-600/10",
  "text-red-600": "bg-red-600/10",
};

// <-------------- colors for project card for user   --------------->

export const getPriorityBorderColor = (priority) => {
  switch (priority?.toLowerCase()) {
    case "high":
    case "critical":
      return "bg-gradient-to-r from-red-500 to-red-600";
    case "medium":
      return "bg-gradient-to-r from-yellow-500 to-orange-500";
    case "low":
      return "bg-gradient-to-r from-green-500 to-emerald-500";
    default:
      return "bg-gradient-to-r from-gray-400 to-gray-500";
  }
};

export const getPriorityChipColor = (priority) => {
  switch (priority?.toLowerCase()) {
    case "high":
    case "critical":
      return "bg-red-100 text-red-700";
    case "medium":
      return "bg-yellow-100 text-yellow-700";
    case "low":
      return "bg-green-100 text-green-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const getPipelineChipColor = (pipeline) => {
  switch (pipeline?.toLowerCase()) {
    case "completed":
    case "done":
      return "bg-green-100 text-green-700";
    case "in progress":
    case "active":
      return "bg-blue-100 text-blue-700";
    case "pending":
    case "waiting":
      return "bg-yellow-100 text-yellow-700";
    case "on hold":
    case "paused":
      return "bg-orange-100 text-orange-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

// <-------------- colors for view project detail card for user   --------------->
export const getPriorityColor = (priority) => {
  switch (priority?.toLowerCase()) {
    case "high":
    case "critical":
      return "bg-gradient-to-r from-red-50 to-red-100 text-red-700 border-red-200";
    case "medium":
      return "bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700 border-yellow-200";
    case "low":
      return "bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-green-200";
    default:
      return "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border-gray-200";
  }
};

export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "completed":
    case "done":
      return "bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 border-emerald-200";
    case "in progress":
    case "active":
      return "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-200";
    case "to do":
    case "pending":
      return "bg-gradient-to-r from-slate-50 to-slate-100 text-slate-700 border-slate-200";
    default:
      return "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border-gray-200";
  }
};

export const getStatusIcon = (status) => {
  switch (status?.toLowerCase()) {
    case "completed":
    case "done":
      return <CheckCircle2 className="w-4 h-4" />;
    case "in progress":
    case "active":
      return <AlertCircle className="w-4 h-4" />;
    case "to do":
    case "pending":
      return <Circle className="w-4 h-4" />;
    default:
      return <Circle className="w-4 h-4" />;
  }
};
