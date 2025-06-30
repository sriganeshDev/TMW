import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Box,
  Typography,
  Chip,
  Divider,
} from "@mui/material";
import {
  MoreVertical,
  Eye,
  Clock,
  Calendar,
  User,
  FileText,
  AlertCircle,
} from "lucide-react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  formatDate,
  formatDateTime,
  getBorderColor,
  getPriorityColor,
  getPriorityDotColor,
  getStatusBgColor,
  getStatusDisplay,
} from "../../utils/helpers/basicHelper";

const TaskCardUi = ({ task, onMenuClick, module }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    event.stopPropagation(); // Prevent event bubbling

    // If onMenuClick prop is provided, use it (for the new menu functionality)
    if (onMenuClick) {
      onMenuClick(event, task);
    } else {
      // Fallback to original behavior
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const TaskDetailsTooltip = () => (
    <Box sx={{ p: 2, maxWidth: 350 }}>
      {/* Task Header */}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, mb: 0.5, color: "#1a1a1a" }}
        >
          {task.taskTitle || "Untitled Task"}
        </Typography>
      </Box>

      {/* Description */}
      {task.description && (
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            sx={{ color: "#666", mb: 0.5, fontWeight: 500 }}
          >
            <FileText
              style={{
                width: 14,
                height: 14,
                marginRight: 4,
                display: "inline",
              }}
            />
            Description:
          </Typography>
          <Typography variant="body2" sx={{ color: "#333", lineHeight: 1.4 }}>
            {task.description}
          </Typography>
        </Box>
      )}

      <Divider sx={{ my: 1.5 }} />

      {/* Status and Priority */}
      <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
        <Chip
          label={getStatusDisplay(task.status)}
          size="small"
          sx={{
            backgroundColor:
              task.status === "To do"
                ? "#fbbf24"
                : task.status === "In Progress"
                ? "#3b82f6"
                : task.status === "Completed"
                ? "#10b981"
                : "#6b7280",
            color: "white",
            fontWeight: 500,
            fontSize: "0.75rem",
          }}
        />
        <Chip
          label={task.taskPriority || "Medium"}
          size="small"
          variant="outlined"
          sx={{
            borderColor:
              task.taskPriority?.toLowerCase() === "high"
                ? "#ef4444"
                : task.taskPriority?.toLowerCase() === "medium"
                ? "#f59e0b"
                : "#10b981",
            color:
              task.taskPriority?.toLowerCase() === "high"
                ? "#ef4444"
                : task.taskPriority?.toLowerCase() === "medium"
                ? "#f59e0b"
                : "#10b981",
            fontSize: "0.75rem",
          }}
        />
      </Box>

      {/* Assignment Information */}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="body2"
          sx={{ color: "#666", fontWeight: 600, mb: 1 }}
        >
          Assignment Details
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <User
            style={{ width: 14, height: 14, marginRight: 6, color: "#666" }}
          />
          <Typography
            variant="body2"
            sx={{ color: "#666", fontWeight: 500, mr: 1 }}
          >
            Assigned To:
          </Typography>
          <Typography variant="body2" sx={{ color: "#333" }}>
            {task.assignedTo?.userName || "Unassigned"}
          </Typography>
        </Box>

        {task.assignedDate && (
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Calendar
              style={{ width: 14, height: 14, marginRight: 6, color: "#666" }}
            />
            <Typography
              variant="body2"
              sx={{ color: "#666", fontWeight: 500, mr: 1 }}
            >
              Assigned Date:
            </Typography>
            <Typography variant="body2" sx={{ color: "#333" }}>
              {formatDateTime(task.assignedDate)}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Calendar
            style={{ width: 14, height: 14, marginRight: 6, color: "#666" }}
          />
          <Typography
            variant="body2"
            sx={{ color: "#666", fontWeight: 500, mr: 1 }}
          >
            Due Date:
          </Typography>
          <Typography variant="body2" sx={{ color: "#333" }}>
            {formatDateTime(task.TaskDueDate)}
          </Typography>
        </Box>
      </Box>

      {/* Status Timeline */}
      <Box sx={{ mb: 1 }}>
        <Typography
          variant="body2"
          sx={{ color: "#666", fontWeight: 600, mb: 1 }}
        >
          Status Timeline
        </Typography>

        {task.toDoDate && (
          <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: "#fbbf24",
                mr: 1,
              }}
            />
            <Typography variant="caption" sx={{ color: "#666", mr: 1 }}>
              To Do:
            </Typography>
            <Typography variant="caption" sx={{ color: "#333" }}>
              {formatDateTime(task.toDoDate)}
            </Typography>
          </Box>
        )}

        {task.InProgressDate && (
          <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: "#3b82f6",
                mr: 1,
              }}
            />
            <Typography variant="caption" sx={{ color: "#666", mr: 1 }}>
              In Progress:
            </Typography>
            <Typography variant="caption" sx={{ color: "#333" }}>
              {formatDateTime(task.InProgressDate)}
            </Typography>
          </Box>
        )}

        {task.CompletedDate && (
          <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                bgcolor: "#10b981",
                mr: 1,
              }}
            />
            <Typography variant="caption" sx={{ color: "#666", mr: 1 }}>
              Completed:
            </Typography>
            <Typography variant="caption" sx={{ color: "#333" }}>
              {formatDateTime(task.CompletedDate)}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );

  return (
    <div
      className={`border-l-4 rounded-lg ${getBorderColor(task.status)} w-full`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer gap-3 sm:gap-4">
        {/* Left section */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 flex-1 min-w-0">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="min-w-0 flex-1">
              {/* Tooltip now only wraps the task title */}
              <Tooltip
                title={<TaskDetailsTooltip />}
                placement="bottom-start"
                arrow
                enterDelay={500}
                leaveDelay={200}
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, 10],
                        },
                      },
                      {
                        name: "preventOverflow",
                        options: {
                          boundary: "viewport",
                          padding: 16,
                        },
                      },
                      {
                        name: "flip",
                        options: {
                          fallbackPlacements: [
                            "top-start",
                            "bottom-end",
                            "top-end",
                          ],
                        },
                      },
                    ],
                  },
                  tooltip: {
                    sx: {
                      bgcolor: "white",
                      color: "black",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "0.875rem",
                      maxWidth: "none",
                      zIndex: 9999,
                    },
                  },
                  arrow: {
                    sx: {
                      color: "white",
                      "&::before": {
                        border: "1px solid #e5e7eb",
                      },
                    },
                  },
                }}
              >
                <h4 className="text-sm font-medium text-gray-900 truncate sm:max-w-52 cursor-pointer hover:text-gray-700">
                  {task.taskTitle || task.title || "Untitled Task"}
                </h4>
              </Tooltip>
            </div>
          </div>

          {/* Priority and Status badges */}
          <div className="flex items-center space-x-2 flex-wrap">
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                task.taskPriority
              )}`}
            >
              <div
                className={`w-2 h-2 ${getPriorityDotColor(
                  task.taskPriority
                )} rounded-full mr-1`}
              ></div>
              {task.taskPriority || "Medium"}
            </span>

            <span
              className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium text-white ${getStatusBgColor(
                task.status
              )}`}
            >
              {getStatusDisplay(task.status)}
            </span>
          </div>
        </div>

        {/* Right section */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 flex-shrink-0">
          {/* Time and Date info */}
          <div className="flex items-center space-x-4">
            {/* <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">{task.hours || "N/A"}</span>
              <span className="sm:hidden text-xs">{task.hours || "N/A"}</span>
            </div> */}
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">
                {formatDate(task.TaskDueDate)}
              </span>
              <span className="sm:hidden text-xs">
                {formatDate(task.TaskDueDate)}
              </span>
            </div>
          </div>

          {/* Assigned user info */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              {task.assignedTo?.userName
                ? task.assignedTo.userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                : "A"}
            </div>
            <p className="text-sm text-gray-500 truncate max-w-24 sm:max-w-none">
              {task.assignedTo?.userName || task.assigned || "Unassigned"}
            </p>
          </div>

          <button
            className="text-gray-400 cursor-pointer hover:text-gray-600 flex-shrink-0 p-1"
            onClick={handleClick}
          >
            {module === "dashboard" ? (
              <Eye className="w-4 h-4" />
            ) : (
              <MoreVertical className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Original Menu - only show if onMenuClick prop is not provided */}
      {!onMenuClick && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          slotProps={{
            paper: {
              elevation: 1,
              sx: {
                borderRadius: "8px",
                minWidth: 120,
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                zIndex: 9999,
              },
            },
          }}
        >
          {/* Uncomment and customize these menu items as needed */}
          {/* <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <EditIcon sx={{ color: "purple", fontSize: "18px" }} />
            </ListItemIcon>
            <ListItemText
              primary="Edit"
              primaryTypographyProps={{
                fontSize: "0.875rem",
              }}
            />
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <DeleteIcon sx={{ color: "red", fontSize: "18px" }} />
            </ListItemIcon>
            <ListItemText
              primary="Delete"
              primaryTypographyProps={{
                fontSize: "0.875rem",
              }}
            />
          </MenuItem> */}
        </Menu>
      )}
    </div>
  );
};

export default TaskCardUi;
