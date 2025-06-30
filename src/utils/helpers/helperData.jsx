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
