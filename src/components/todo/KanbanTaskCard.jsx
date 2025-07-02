import { Draggable } from "@hello-pangea/dnd";
import React from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { CalendarDays, Clock, Loader2, Timer, User } from "lucide-react";
const KanbanTaskCard = ({
  task,
  index,
  formatDate,
  updatingTaskId,
  getStatusDot,
}) => {
  const dueDateInfo = formatDate(task.TaskDueDate);
  const assignedDateInfo = formatDate(task.assignedDate);
  const updatedDateInfo = formatDate(task.updatedAt);
  const isUpdating = updatingTaskId === task._id;

  return (
    <Draggable draggableId={task._id} index={index} isDragDisabled={isUpdating}>
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

            ...(snapshot.isDragging && { zIndex: 1000 }),
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex space-x-1">
              <DragIndicatorIcon />
            </div>
            {isUpdating && (
              <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
            )}
          </div>

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

          <div className="border-t border-gray-100 pt-3">
            <div className="space-y-2">
              {task.TaskDueDate && (
                <div className="flex items-center space-x-2">
                  <div
                    className={`p-1 rounded ${
                      dueDateInfo.isOverdue ? "bg-red-50" : "bg-blue-50"
                    }`}
                  >
                    <CalendarDays
                      className={`w-3 h-3 ${
                        dueDateInfo.isOverdue ? "text-red-600" : "text-blue-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Due Date
                    </p>
                    <p
                      className={`text-xs font-medium ${
                        dueDateInfo.isOverdue ? "text-red-700" : "text-gray-900"
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
export default KanbanTaskCard;
