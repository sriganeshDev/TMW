import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Clock, User, CalendarDays, Timer, Loader2 } from "lucide-react";
import {
  getAllTasksForUser,
  updateTaskStatusForUser,
} from "../../services/Task/TaskServices";
import nofound from "../../assets/no-data2.gif";

import KanbanTaskCard from "./KanbanTaskCard";
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
      console.log(error.message);
      return "Invalid date ";
    }
  };

  //<<<<----------- Fetch all tasks------------>>>>
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

  // <<<------- search ----------------->>>
  const filteredTasks = tasks.filter(
    (task) =>
      task.taskTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.projectId?.projectName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  //-<<<<<<<<<------------- Group tasks by status for kanban columns------------>>>>>>>
  const getTasksByStatus = (status) => {
    return filteredTasks.filter((task) => task.status === status);
  };

  const getStatusDot = (status) => {
    const option = statusOptions.find((o) => o.value === status);
    return option ? option.dotColor : "bg-gray-500";
  };

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId;
    const taskId = draggableId;

    const taskToUpdate = tasks.find((task) => task._id === taskId);
    if (!taskToUpdate) {
      console.error("Task not found:", taskId);
      return;
    }

    if (taskToUpdate.status === newStatus) {
      return;
    }

    const originalStatus = taskToUpdate.status;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      )
    );

    setUpdatingTaskId(taskId);
    // <<<<<<<<<<<------ Update Task------------>>>>>>>>>>>
    try {
      const response = await updateTaskStatusForUser({
        taskId: taskId,
        status: newStatus,
      });

      if (response.status === 200 || response.status === "200") {
        if (onTaskUpdate) {
          await onTaskUpdate();
        }
        console.log("Task status updated successfully");
      } else {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, status: originalStatus } : task
          )
        );
        console.error("Failed to update task status:", response.message);
      }
    } catch (err) {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full overflow-auto p-6">
          {columns.map((column) => {
            const columnTasks = getTasksByStatus(column.id);
            return (
              <div
                key={column.id}
                className={`${column.color} ${column.borderColor} border rounded-lg flex flex-col`}
              >
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
                            <KanbanTaskCard
                              key={task._id}
                              task={task}
                              index={index}
                              formatDate={formatDate}
                              updatingTaskId={updatingTaskId}
                              getStatusDot={getStatusDot}
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
