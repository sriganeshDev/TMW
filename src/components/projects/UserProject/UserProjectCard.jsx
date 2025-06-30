import React from "react";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { useNavigate } from "react-router-dom";

const UserProjectCard = ({ projectsWithTasks }) => {
  const navigate = useNavigate();

  const getPriorityBorderColor = (priority) => {
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

  const getPriorityChipColor = (priority) => {
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

  const getPipelineChipColor = (pipeline) => {
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

  const getGridClasses = () => {
    const count = projectsWithTasks.length;
    if (count === 1) {
      return "grid grid-cols-1 gap-6";
    } else if (count === 2) {
      return "grid grid-cols-1 md:grid-cols-2 gap-6";
    } else {
      return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
    }
  };

  const handleProjectClick = (projectId) => {
    navigate("/smart-HR/View-project-task", { state: { projectId } });
  };

  return (
    <div className={getGridClasses()}>
      {projectsWithTasks.map((project) => (
        <div
          key={project.projectId}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden relative group cursor-pointer"
          onClick={() => handleProjectClick(project.projectId)}
        >
          <div
            className={`h-1 w-full ${getPriorityBorderColor(
              project.projectPriority
            )}`}
          ></div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-800 leading-tight max-w-[70%]">
                {project.projectName}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityChipColor(
                  project.projectPriority
                )}`}
              >
                {project.projectPriority}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-4 h-12 overflow-hidden line-clamp-2 leading-relaxed">
              {project.description}
            </p>

            <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Start Date
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    {project.projectStartDate}
                  </p>
                </div>
                <div className="w-px h-8 bg-gray-300 mx-4"></div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Due Date
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    {project.projectDueDate}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span
                className={`px-4 py-2 rounded-xl text-sm font-semibold flex-1 text-center ${getPipelineChipColor(
                  project.pipeLine
                )}`}
              >
                {project.pipeLine}
              </span>
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-xl border border-blue-200">
                <AssignmentOutlinedIcon />
                <span className="text-sm font-semibold text-blue-600">
                  {project.taskCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserProjectCard;
