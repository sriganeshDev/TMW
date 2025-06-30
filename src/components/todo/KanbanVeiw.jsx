import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  Clock,
  Calendar,
  List,
  CheckCircle,
  User,
  CalendarDays,
  Timer,
  AlertCircle,
  MoreVertical,
  Loader2,
} from "lucide-react";
import {
  getAllTasksForUser,
  updateTaskStatusForUser,
} from "../../services/Task/TaskServices";
import nofound from "../../assets/no-data2.gif";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
const statusOptions = [
  { value: "To do", label: "To Do", dotColor: "bg-cyan-500" },
  { value: "In Progress", label: "In Progress", dotColor: "bg-purple-500" },
  { value: "Completed", label: "Completed", dotColor: "bg-green-500" },
];

const KanbanView = ({ searchTerm, onTaskUpdate }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updatingTaskId, setUpdatingTaskId] = useState(null);

  const columns = [
    {
      id: "To do",
      title: "To Do",
      color: "bg-cyan-50",
      borderColor: "border-cyan-200",
      headerColor: "bg-cyan-400",
      dotColor: "bg-cyan-500",
    },
    {
      id: "In Progress",
      title: "In Progress",
      color: "bg-purple-50",
      borderColor: "border-purple-200",
      headerColor: "bg-purple-500",
      dotColor: "bg-purple-400",
    },
    {
      id: "Completed",
      title: "Completed",
      color: "bg-green-50",
      borderColor: "border-green-200",
      headerColor: "bg-green-400",
      dotColor: "bg-green-500",
    },
  ];

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

  // Fetch all tasks
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getAllTasksForUser({});

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
    fetchTasks();
  }, []);

  // Filter tasks based on search term
  const filteredTasks = tasks.filter(
    (task) =>
      task.taskTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.projectId?.projectName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // Group tasks by status for kanban columns
  const getTasksByStatus = (status) => {
    return filteredTasks.filter((task) => task.status === status);
  };

  // Get status dot color
  const getStatusDot = (status) => {
    const option = statusOptions.find((o) => o.value === status);
    return option ? option.dotColor : "bg-gray-500";
  };

  // Handle drag end - CORRECTED VERSION
  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    // If dropped outside any droppable area
    if (!destination) {
      return;
    }

    // If dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId;
    const taskId = draggableId;

    // Find the task being moved
    const taskToUpdate = tasks.find((task) => task._id === taskId);
    if (!taskToUpdate) {
      console.error("Task not found:", taskId);
      return;
    }

    // If the status is the same, no need to update
    if (taskToUpdate.status === newStatus) {
      return;
    }

    // Store original status for potential rollback
    const originalStatus = taskToUpdate.status;

    // Optimistically update the UI
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );

    setUpdatingTaskId(taskId);

    try {
      const response = await updateTaskStatusForUser({
        taskId: taskId,
        status: newStatus,
      });

      if (response.status === 200 || response.status === "200") {
        // Success - call the parent's update handler to refresh counts
        if (onTaskUpdate) {
          await onTaskUpdate();
        }
        console.log("Task status updated successfully");
      } else {
        // API returned error - revert the optimistic update
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, status: originalStatus } : task
          )
        );
        console.error("Failed to update task status:", response.message);
      }
    } catch (err) {
      // Network or other error - revert the optimistic update
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: originalStatus } : task
        )
      );
      console.error("Error updating task status:", err);
    } finally {
      setUpdatingTaskId(null);
    }
  };

  // Task Card Component
  const TaskCard = ({ task, index }) => {
    const dueDateInfo = formatDate(task.TaskDueDate);
    const assignedDateInfo = formatDate(task.assignedDate);
    const updatedDateInfo = formatDate(task.updatedAt);
    const isUpdating = updatingTaskId === task._id;

    return (
      <Draggable
        draggableId={task._id}
        index={index}
        isDragDisabled={isUpdating}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`bg-white rounded-xl border border-gray-200 p-4 mb-3 transition-all duration-200 select-none ${
              snapshot.isDragging
                ? "shadow-2xl rotate-2 scale-105 z-50 cursor-grabbing"
                : "hover:shadow-lg cursor-grab hover:border-gray-300"
            } ${isUpdating ? "opacity-60 pointer-events-none" : ""}`}
            style={{
              ...provided.draggableProps.style,
              // Ensure the dragging item has proper z-index
              ...(snapshot.isDragging && { zIndex: 1000 }),
            }}
          >
            {/* Drag Indicator */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex space-x-1">
                <DragIndicatorIcon />
              </div>
              {isUpdating && (
                <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
              )}
            </div>

            {/* Header Section */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2 flex-wrap">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    {task.projectId?.projectName || "No Project"}
                  </span>
                  <div
                    className={`w-2 h-2 rounded-full ${getStatusDot(
                      task.status
                    )}`}
                  />
                  {task.taskPriority && (
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
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
                <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
                  {task.taskTitle}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {task.description}
                </p>
              </div>
            </div>

            {/* Date Information Section */}
            <div className="border-t border-gray-100 pt-3">
              <div className="space-y-2">
                {/* Due Date */}
                {task.TaskDueDate && (
                  <div className="flex items-center space-x-2">
                    <div
                      className={`p-1 rounded ${
                        dueDateInfo.isOverdue ? "bg-red-50" : "bg-blue-50"
                      }`}
                    >
                      <CalendarDays
                        className={`w-3 h-3 ${
                          dueDateInfo.isOverdue
                            ? "text-red-600"
                            : "text-blue-600"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Due Date
                      </p>
                      <p
                        className={`text-xs font-medium ${
                          dueDateInfo.isOverdue
                            ? "text-red-700"
                            : "text-gray-900"
                        }`}
                      >
                        {typeof dueDateInfo === "object"
                          ? dueDateInfo.date
                          : dueDateInfo}
                      </p>
                      {typeof dueDateInfo === "object" &&
                        dueDateInfo.relative && (
                          <p
                            className={`text-xs ${
                              dueDateInfo.isOverdue
                                ? "text-red-600"
                                : "text-gray-500"
                            }`}
                          >
                            {dueDateInfo.relative}
                          </p>
                        )}
                    </div>
                  </div>
                )}

                {/* Assigned Date */}
                {task.assignedDate && (
                  <div className="flex items-center space-x-2">
                    <div className="p-1 bg-green-50 rounded">
                      <Timer className="w-3 h-3 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Assigned
                      </p>
                      <p className="text-xs font-medium text-gray-900">
                        {typeof assignedDateInfo === "object"
                          ? assignedDateInfo.date
                          : assignedDateInfo}
                      </p>
                    </div>
                  </div>
                )}

                {/* Last Updated */}
                {task.updatedAt && (
                  <div className="flex items-center space-x-2">
                    <div className="p-1 bg-purple-50 rounded">
                      <Clock className="w-3 h-3 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Last Updated
                      </p>
                      <p className="text-xs font-medium text-gray-900">
                        {typeof updatedDateInfo === "object"
                          ? updatedDateInfo.date
                          : updatedDateInfo}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Assigned User */}
              {task.assignedTo?.userName && (
                <div className="flex items-center space-x-2 mt-3 pt-2 border-t border-gray-100">
                  <div className="p-1 bg-gray-100 rounded-full">
                    <User className="w-3 h-3 text-gray-600" />
                  </div>
                  <span className="text-xs text-gray-600">
                    Assigned to{" "}
                    <span className="font-medium text-gray-900">
                      {task.assignedTo.userName}
                    </span>
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </Draggable>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-20">
        <div className="flex flex-col items-center space-y-4">
          <div className="loader"></div>
          <p className="text-gray-500">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
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
    );
  }

  return (
    <div className="h-full overflow-hidden">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full p-6">
          {columns.map((column) => {
            const columnTasks = getTasksByStatus(column.id);
            return (
              <div
                key={column.id}
                className={`${column.color} ${column.borderColor} border rounded-lg flex flex-col`}
              >
                {/* Column Header */}
                <div
                  className={`${column.headerColor} text-white p-4 rounded-t-lg flex items-center justify-between`}
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 ${column.dotColor} rounded-full bg-white`}
                    ></div>
                    <h3 className="font-semibold text-sm">{column.title}</h3>
                  </div>
                  <span className="bg-white bg-opacity-20 text-xs font-medium px-2 text-black py-1 rounded-full">
                    {columnTasks.length}
                  </span>
                </div>

                {/* Droppable Area */}
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex-1 p-4 min-h-[200px] transition-all duration-200 overflow-y-auto ${
                        snapshot.isDraggingOver
                          ? "bg-opacity-80 ring-2 ring-blue-300 ring-inset"
                          : ""
                      }`}
                      style={{
                        minHeight: "calc(100vh - 300px)",
                        maxHeight: "calc(100vh - 300px)",
                      }}
                    >
                      {columnTasks.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                          <img
                            src={nofound}
                            alt="No data found"
                            className="w-20 h-20 sm:w-20 sm:h-20 md:w-30 md:h-30 object-contain mb-4"
                          />
                          <p className="text-sm">
                            Not Available of {column.title.toLowerCase()} tasks
                          </p>
                          {searchTerm && (
                            <p className="text-xs text-gray-400 mt-1">
                              Try adjusting your search
                            </p>
                          )}
                          {searchTerm && (
                            <p className="text-xs text-gray-400 mt-1">
                              Try adjusting your search
                            </p>
                          )}
                          {snapshot.isDraggingOver && (
                            <div className="mt-2 p-2 bg-blue-100 rounded-lg border-2 border-dashed border-blue-300">
                              <p className="text-xs text-blue-600 font-medium">
                                Drop task here to move to {column.title}
                              </p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <>
                          {columnTasks.map((task, index) => (
                            <TaskCard
                              key={task._id}
                              task={task}
                              index={index}
                            />
                          ))}
                          {snapshot.isDraggingOver && (
                            <div className="mb-3 p-3 bg-blue-50 rounded-lg border-2 border-dashed border-blue-300">
                              <p className="text-xs text-blue-600 font-medium text-center">
                                Move to {column.title}
                              </p>
                            </div>
                          )}
                        </>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanView;
