import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Flag,
  Users,
  CheckCircle2,
  Circle,
  AlertCircle,
  User,
  MapPin,
} from "lucide-react";
import { getuserTaskForproject } from "../../../services/Task/TaskServices";
import nofound from "./../../../assets/no-data2.gif";
import {
  getPriorityColor,
  getStatusColor,
  getStatusIcon,
} from "../../../utils/helpers/helperData";
export const ProjectDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [projectDetails, setProjectDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const projectId = location.state?.projectId;

  useEffect(() => {
    if (projectId) {
      fetchProjectTasks();
    } else {
      setLoading(false);
    }
  }, [projectId]);

  const fetchProjectTasks = async () => {
    try {
      setLoading(true);
      const response = await getuserTaskForproject(projectId);

      if (response.status === "200" && response.data) {
        setTasks(response.data);

        if (response.data.length > 0) {
          setProjectDetails(response.data[0].projectId);
        }
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-20">
        <div className="flex flex-col items-center space-y-4">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  if (!projectId || !projectDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <img
            src={nofound}
            alt="No data found"
            className="w-20 h-20 sm:w-20 sm:h-20 md:w-30 md:h-30 object-contain mb-4"
          />
          <p className="text-gray-600 mb-4">
            The project you're looking for doesn't exist
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200  hover:shadow-xl"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-start px-3 pb-3.5 items-center">
        <p className="text-xl flex items-center gap-2 text-gray-700 font-semibold mb-3">
          <p className="orange-underline">View Projects Details</p>
        </p>
      </div>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="bg-white/80 h-fit backdrop-blur-sm  px-3 py-4 z-10">
          <div className="flex items-center gap-4 w-full">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 cursor-pointer  rounded-xl transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 hover:text-red-500 text-gray-600" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {projectDetails.projectName}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Project Management Dashboard
              </p>
            </div>
            <div className="flex items-center gap-2 pr-3.5">
              <span
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${getPriorityColor(
                  projectDetails.projectPriority
                )}`}
              >
                <Flag className="w-4 h-4 mr-2" />
                {projectDetails.projectPriority} Priority
              </span>
              <span
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(
                  projectDetails.pipeLine
                )}`}
              >
                {getStatusIcon(projectDetails.pipeLine)}
                <span className="ml-2">{projectDetails.pipeLine}</span>
              </span>
            </div>
          </div>
          <div className="w-full ">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl px-8 py-5 mx-3">
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold text-gray-500 block mb-2 uppercase tracking-wide">
                    Description
                  </label>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {projectDetails.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-semibold text-gray-500 block mb-2 uppercase tracking-wide">
                      Timeline
                    </label>
                    <div className=" flex  gap-2 items-center">
                      <div className="flex items-center text-sm text-gray-700">
                        <Calendar className="w-4 h-4 mr-3 text-green-600" />
                        <span className="font-medium">Start:</span>
                        <span className="ml-2">
                          {formatDate(projectDetails.projectStartDate)}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-700">
                        <Clock className="w-4 h-4 mr-3 text-red-600" />
                        <span className="font-medium">Due:</span>
                        <span className="ml-2">
                          {formatDate(projectDetails.projectDueDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full py-4  ">
          <div className=" backdrop-blur-sm rounded-xl border border-gray-200 overflow-hidden flex flex-col max-h-[calc(100vh-9rem)]">
            <div className="p-5 border-b border-gray-200  bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl orange-underline font-bold text-gray-800 mb-2">
                    Project Tasks
                  </h2>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {tasks.length}
                  </div>
                  <div className="text-sm text-gray-500">Active Tasks</div>
                </div>
              </div>
            </div>

            <div className="p-8 overflow-y-auto flex-1">
              {tasks.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-gray-300 mb-4">
                    <Users className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No tasks found
                  </h3>
                  <p className="text-gray-500">
                    No tasks have been assigned to this project yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {tasks.map((task) => (
                    <div
                      key={task._id}
                      onClick={() => navigate(`/smart-HR/todo`)}
                      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer hover:bg-[#f4f4f7]"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="font-bold text-gray-800 text-xl  transition-colors">
                            {task.taskTitle}
                          </h3>
                          <div className="flex items-center gap-3">
                            <span
                              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${getPriorityColor(
                                task.taskPriority
                              )}`}
                            >
                              <Flag className="w-3 h-3 mr-1" />
                              {task.taskPriority}
                            </span>
                            <span
                              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(
                                task.status
                              )}`}
                            >
                              {getStatusIcon(task.status)}
                              <span className="ml-1">{task.status}</span>
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                          {task.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <div className="flex items-center text-gray-500">
                              <User className="w-4 h-4 mr-2" />
                              <span className="text-sm font-medium">
                                {task.assignedTo?.userName || "Unassigned"}
                              </span>
                            </div>
                            <div className="flex items-center text-gray-500">
                              <Calendar className="w-4 h-4 mr-2" />
                              <span className="text-sm">
                                Due: {formatDate(task.TaskDueDate)}
                              </span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-400">
                            Updated {formatDate(task.updatedAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
