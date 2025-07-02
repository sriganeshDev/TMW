import React from "react";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { useNavigate } from "react-router-dom";
import {
  getPipelineChipColor,
  getPriorityBorderColor,
  getPriorityChipColor,
} from "../../../utils/helpers/helperData";

const UserProjectCard = ({ projectsWithTasks }) => {
  const navigate = useNavigate();

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

            <div className="mb-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Pipeline Status
                  </span>
                </div>
                <div
                  className={`w-full px-4 py-3 rounded-xl text-sm font-semibold text-center transition-all duration-200 ${getPipelineChipColor(
                    project.pipeLine
                  )}`}
                >
                  {project.pipeLine}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Total Tasks
                  </span>
                </div>
                <div className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 rounded-xl border border-blue-200 transition-all duration-200 hover:from-blue-100 hover:to-indigo-100">
                  <AssignmentOutlinedIcon className="text-blue-600" />
                  <span className="text-sm font-semibold text-blue-700">
                    {project.taskCount}
                    {project.taskCount === 1 ? "Task" : "Tasks"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserProjectCard;
