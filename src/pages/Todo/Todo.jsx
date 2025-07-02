import React, { useState, useEffect } from "react";
import {
  Clock,
  Calendar,
  List,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  User,
  CalendarDays,
  Timer,
  LayoutDashboard,
  Grid3X3,
} from "lucide-react";
import {
  getAllTasksForUser,
  updateTaskStatusForUser,
} from "../../services/Task/TaskServices";
import nofound from "../../assets/no-data2.gif";
import KanbanView from "../../components/todo/KanbanVeiw";
import { ByNameAvater } from "../../utils/helpers/basicHelper";
import { toast } from "react-toastify";
import { CommonDropdown } from "../../components/reusablecomponents/CommonDropDown";

const statusOptions = [
  { value: "To do", label: "To Do", dotColor: "bg-cyan-500" },
  { value: "In Progress", label: "In Progress", dotColor: "bg-purple-500" },
  { value: "Completed", label: "Completed", dotColor: "bg-green-500" },
];

const Todo = () => {
  const [activeSection, setActiveSection] = useState("All Tasks");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("list");

  const [allTasksCounts, setAllTasksCounts] = useState({
    Pending: 0,
    Inprogress: 0,
    Completed: 0,
    "All Tasks": 0,
  });

  const formatDate = (dateString) => {
    if (!dateString) return "No date";

    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInDays = Math.floor((date - now) / (1000 * 60 * 60 * 24));

      const dateOptions = {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
      };

      const timeOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };

      const formattedDate = date.toLocaleDateString("en-US", dateOptions);
      const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

      let relativeTime = "";
      if (diffInDays === 0) {
        relativeTime = "Today";
      } else if (diffInDays === 1) {
        relativeTime = "Tomorrow";
      } else if (diffInDays === -1) {
        relativeTime = "Yesterday";
      } else if (diffInDays > 1) {
        relativeTime = `In ${diffInDays} days`;
      } else if (diffInDays < -1) {
        relativeTime = `${Math.abs(diffInDays)} days ago`;
      }

      return {
        formatted: `${formattedDate} at ${formattedTime}`,
        date: formattedDate,
        time: formattedTime,
        relative: relativeTime,
        isOverdue: diffInDays < 0,
      };
    } catch (error) {
      return "Invalid date";
    }
  };

  // <------------------Fetch tasks based on active section------------------>
  const fetchTasks = async (section) => {
    setLoading(true);
    setError(null);

    try {
      let payload = {};

      // <------------------Map section to API status------------->
      const statusMapping = {
        Pending: "To do",
        Inprogress: "In Progress",
        Completed: "Completed",
        "All Tasks": null,
      };

      const apiStatus = statusMapping[section];
      if (apiStatus) {
        payload.status = apiStatus;
      }
      console.log("payload", payload);

      const response = await getAllTasksForUser(payload);

      if (response.status === "200" || response.status === 200) {
        setTasks(response.data || []);
      } else {
        setError(response.message || "Failed to fetch tasks");
        setTasks([]);
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError(err.message || "An error occurred while fetching tasks");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(activeSection);
  }, [activeSection]);

  const fetchTaskCounts = async () => {
    try {
      const allTasksResponse = await getAllTasksForUser({});
      if (
        allTasksResponse.status === "200" ||
        allTasksResponse.status === 200
      ) {
        const allTasks = allTasksResponse.data || [];

        const newCounts = {
          Pending: allTasks.filter((t) => t.status === "To do").length || 0,
          Inprogress:
            allTasks.filter((t) => t.status === "In Progress").length || 0,
          Completed:
            allTasks.filter((t) => t.status === "Completed").length || 0,
          "All Tasks": allTasks.length || 0,
        };

        setAllTasksCounts(newCounts);
      } else {
        setAllTasksCounts({
          Pending: 0,
          Inprogress: 0,
          Completed: 0,
          "All Tasks": 0,
        });
      }
    } catch (err) {
      console.error("Error fetching task counts:", err);
      setAllTasksCounts({
        Pending: 0,
        Inprogress: 0,
        Completed: 0,
        "All Tasks": 0,
      });
    }
  };

  useEffect(() => {
    fetchTaskCounts();
  }, []);

  const menuItems = [
    { name: "All Tasks", icon: List, count: allTasksCounts["All Tasks"] },
    { name: "Pending", icon: Clock, count: allTasksCounts["Pending"] },
    { name: "Inprogress", icon: Calendar, count: allTasksCounts["Inprogress"] },
    {
      name: "Completed",
      icon: CheckCircle,
      count: allTasksCounts["Completed"],
    },
  ];

  const filteredTasks = tasks.filter(
    (task) =>
      task.taskTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.projectId?.projectName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const getStatusDot = (status) => {
    const option = statusOptions.find((o) => o.value === status);
    return option ? option.dotColor : "bg-gray-500";
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSearchTerm("");
  };

  const getEmptyStateMessage = (section, hasSearchTerm) => {
    if (hasSearchTerm) {
      return {
        title: "No tasks found",
        description: "Try adjusting your search terms",
      };
    }

    const messages = {
      "All Tasks": {
        title: "No tasks found",
        description: "No tasks available",
      },
      Pending: {
        title: "No pending tasks",
        description: "No pending tasks at the moment",
      },
      Inprogress: {
        title: "No tasks in progress",
        description: "No tasks currently in progress",
      },
      Completed: {
        title: "No completed tasks",
        description: "No completed tasks yet",
      },
    };

    return messages[section] || messages["All Tasks"];
  };

  const handleTaskUpdate = async () => {
    await fetchTaskCounts();
    await fetchTasks(activeSection);
  };

  const TaskCardUi = ({ task }) => {
    const [updating, setUpdating] = useState(false);

    const dueDateInfo = formatDate(task.TaskDueDate);
    const assignedDateInfo = formatDate(task.assignedDate);
    const updatedDateInfo = formatDate(task.updatedAt);

    const handleStatusChange = async (newStatus) => {
      setUpdating(true);

      try {
        const response = await updateTaskStatusForUser({
          taskId: task._id,
          status: newStatus,
        });

        if (response.status === 200) {
          // -<----------------- Update counts  ------------>
          await handleTaskUpdate();
          toast.success(`Task status updated to "${newStatus}"`);
        } else {
          console.error("Failed to update task status:", response.message);
        }
      } catch (err) {
        console.error("Error updating task status:", err);
      } finally {
        setUpdating(false);
      }
    };

    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-all duration-200 hover:border-gray-300">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#fee2e2] rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-[#f74531] font-bold text-sm">
                    {ByNameAvater(task.projectId?.projectName)}
                  </span>
                </div>
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full whitespace-nowrap">
                  {task.projectId?.projectName || "No Project"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${getStatusDot(
                    task.status
                  )}`}
                />

                {task.taskPriority && (
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                      task.taskPriority === "High"
                        ? "bg-red-100 text-red-700"
                        : task.taskPriority === "Medium"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {task.taskPriority} Priority
                  </span>
                )}
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 leading-tight">
              {task.taskTitle}
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
              {task.description}
            </p>
          </div>

          <div className="relative flex-shrink-0 w-full sm:w-auto lg:ml-6 lg:min-w-[140px]">
            <CommonDropdown
              value={task.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              options={statusOptions}
              fullWidth
              disabled={updating}
              placeholder="Select Status"
            />

            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              {updating ? (
                <Loader2 className="w-4 h-4 text-gray-500 animate-spin" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="flex items-start gap-3">
              <div
                className={`p-2.5 rounded-lg flex-shrink-0 ${
                  dueDateInfo.isOverdue ? "bg-red-50" : "bg-blue-50"
                }`}
              >
                <CalendarDays
                  className={`w-4 h-4 ${
                    dueDateInfo.isOverdue ? "text-red-600" : "text-blue-600"
                  }`}
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Due Date
                </p>

                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 flex-wrap">
                  <p
                    className={`text-sm font-medium leading-tight m-0 ${
                      dueDateInfo.isOverdue ? "text-red-700" : "text-gray-900"
                    }`}
                  >
                    {typeof dueDateInfo === "object"
                      ? dueDateInfo.date
                      : dueDateInfo}
                  </p>
                  {typeof dueDateInfo === "object" && dueDateInfo.relative && (
                    <p
                      className={`text-xs m-0 ${
                        dueDateInfo.isOverdue ? "text-red-600" : "text-gray-500"
                      }`}
                    >
                      {dueDateInfo.relative}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-green-50 rounded-lg flex-shrink-0">
                <Timer className="w-4 h-4 text-green-600" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Assigned
                </p>

                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 flex-wrap">
                  <p className="text-sm font-medium text-gray-900 leading-tight m-0">
                    {typeof assignedDateInfo === "object"
                      ? assignedDateInfo.date
                      : assignedDateInfo}
                  </p>
                  {typeof assignedDateInfo === "object" &&
                    assignedDateInfo.time && (
                      <p className="text-xs text-gray-500 m-0">
                        {assignedDateInfo.time}
                      </p>
                    )}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-purple-50 rounded-lg flex-shrink-0">
                <Clock className="w-4 h-4 text-purple-600" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Last Updated
                </p>

                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 flex-wrap">
                  <p className="text-sm font-medium text-gray-900 leading-tight m-0">
                    {typeof updatedDateInfo === "object"
                      ? updatedDateInfo.date
                      : updatedDateInfo}
                  </p>
                  {typeof updatedDateInfo === "object" &&
                    updatedDateInfo.time && (
                      <p className="text-xs text-gray-500 m-0">
                        {updatedDateInfo.time}
                      </p>
                    )}
                </div>
              </div>
            </div>
          </div>

          {task.assignedTo?.userName && (
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-white rounded-full shadow-sm flex-shrink-0">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              <span className="text-sm text-gray-600">
                Assigned to{" "}
                <span className="font-semibold text-gray-900">
                  {task.assignedTo.userName}
                </span>
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-[calc(100vh-120px)] overflow-hidden  bg-gray-50">
      {console.log(isSidebarCollapsed, "isSidebarCollapsed")}
      {viewMode === "list" ? (
        <div
          className={`${
            isSidebarCollapsed ? "w-20" : "w-64"
          } transition-all duration-300 bg-white border-r overflow-auto border-gray-200 flex flex-col`}
        >
          <div className="flex items-center justify-between h-[100px] p-4 border-b border-gray-300 px-2">
            {!isSidebarCollapsed && (
              <div className="px-4">
                <h1 className="text-lg font-semibold text-gray-900">
                  Todo List
                </h1>
                <p className="text-sm text-gray-500">Manage your tasks</p>
              </div>
            )}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="text-gray-500 hover:text-gray-700"
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="ml-5  text-[#ed2812]" />
              ) : (
                <ChevronLeft className=" cursor-pointer" />
              )}
            </button>
          </div>

          <nav className="p-2 flex-1 h-full space-y-4 ">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => handleSectionChange(item.name)}
                  className={`flex items-center ${
                    isSidebarCollapsed ? "justify-center" : "justify-between"
                  } w-full px-3 py-2 text-sm font-medium rounded-lg ${
                    isActive
                      ? "bg-[#ed2812] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div
                    className={`flex items-center space-x-2 ${
                      isSidebarCollapsed ? "justify-center" : ""
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {!isSidebarCollapsed && <span>{item.name}</span>}
                  </div>
                  {!isSidebarCollapsed && (
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        isActive
                          ? "bg-white bg-opacity-20 text-black"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}

            {!isSidebarCollapsed && (
              <div>
                <div className="ml-5 mt-8">
                  <h3 className="text-xs text-gray-600 uppercase font-semibold tracking-wider mb-3">
                    Status Tags
                  </h3>
                  <div className="space-y-5">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                      <span>To Do</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>In Progress</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Completed</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 ml-5">
                  <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
                    Priority
                  </h3>
                  <div className="space-y-5">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>High</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Medium</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>Low</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </nav>
        </div>
      ) : (
        ""
      )}

      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="bg-gray-50 z-10 sticky top-0 px-6 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <List className="w-5 h-5" />
              <span>{activeSection}</span>
              <span className="bg-gray-200 pl-3  text-fuchsia-600 rounded-md px-2 py-1 text-sm font-semibold">
                {filteredTasks.length}{" "}
                {filteredTasks.length === 1 ? "task" : "tasks"}
              </span>
            </h2>

            <div className="flex items-center space-x-4">
              <div className="flex bg-[#f4f4f7] gap-2 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex items-center  cursor-pointer space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    viewMode === "list"
                      ? "bg-[#fce9e6] text-[#ef4444]"
                      : "text-[#ef4444] hover:bg-[#fff9fe]"
                  }`}
                >
                  <span
                    className={`p-1 rounded-md  cursor-pointer transition-colors ${
                      viewMode === "list"
                        ? "bg-[#ef4444] text-white"
                        : "bg-[#f4f4f7] text-inherit"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </span>
                  <span
                    className={`transition-colors  cursor-pointer${
                      viewMode === "list" ? "text-[#ef4444] font-medium" : ""
                    }`}
                  >
                    List
                  </span>
                </button>

                <button
                  onClick={() => {
                    setViewMode("kanban");
                    setIsSidebarCollapsed(isSidebarCollapsed);
                  }}
                  className={`flex items-center  space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    viewMode === "kanban"
                      ? "bg-[#fce9e6] text-[#ef4444]"
                      : "text-[#ef4444] hover:bg-[#fff9fe]"
                  }`}
                >
                  <span
                    className={`p-1 rounded-md  cursor-pointer transition-colors ${
                      viewMode === "kanban"
                        ? "bg-[#ef4444] text-white"
                        : "bg-[#f4f4f7] text-inherit"
                    }`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                  </span>
                  <span
                    className={`transition-colors cursor-pointer ${
                      viewMode === "kanban" ? "text-[#ef4444] font-medium" : ""
                    }`}
                  >
                    Kanban
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {viewMode === "kanban" ? (
            <KanbanView
              searchTerm={searchTerm}
              onTaskUpdate={handleTaskUpdate}
            />
          ) : (
            <div className="px-6 pb-6 overflow-y-auto mt-3 h-full">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="loader"></div>
                  </div>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-10 px-4 sm:py-20">
                  <img
                    src={nofound}
                    alt="No data found"
                    className="w-32 h-32 sm:w-40 sm:h-40 md:w-40 md:h-40 object-contain mb-4"
                  />
                  <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-600">
                    Task not found
                  </p>
                </div>
              ) : filteredTasks.length > 0 ? (
                <div className="space-y-4">
                  {filteredTasks.map((task) => (
                    <TaskCardUi key={task._id} task={task} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                  <div className="text-gray-400 mb-2">
                    <img
                      src={nofound}
                      alt="No data found"
                      className="w-32 h-32 sm:w-40 sm:h-40 md:w-40 md:h-40 object-contain mb-4"
                    />
                    <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-600">
                      Task not found
                    </p>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {getEmptyStateMessage(activeSection, searchTerm).title}
                  </h3>
                  <p className="text-gray-500">
                    {
                      getEmptyStateMessage(activeSection, searchTerm)
                        .description
                    }
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
