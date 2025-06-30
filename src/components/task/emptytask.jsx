import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  MoreVertical,
  Clock,
  Calendar,
  Check,
  GripVertical,
  Edit,
  Trash2,
} from "lucide-react";

const TaskAccordionUI = () => {
  const [expandedSections, setExpandedSections] = useState({
    recent: true,
    yesterday: false,
    oct23: true,
    oct22: true,
  });

  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleDropdownToggle = (taskId) => {
    setDropdownOpen(dropdownOpen === taskId ? null : taskId);
  };
  const taskSections = [
    {
      id: "recent",
      title: "Recent",
      count: 24,
      tasks: [
        {
          id: 1,
          title: "Add images to the cards section",
          status: "Calls",
          priority: "Inprogress",
          statusColor: "bg-teal-500",
          priorityColor: "bg-orange-100 text-orange-800",
          date: "24 Oct 2023",
          avatar: "bg-blue-500",
          borderColor: "border-orange-400",
        },
        {
          id: 4,
          title: "Update user authentication flow",
          status: "Task",
          priority: "High",
          statusColor: "bg-blue-500",
          priorityColor: "bg-red-100 text-red-800",
          date: "24 Oct 2023",
          avatar: "bg-green-500",
          borderColor: "border-red-400",
        },
      ],
    },
    {
      id: "yesterday",
      title: "Yesterday",
      count: null,
      tasks: [
        {
          id: 5,
          title: "Review code changes for mobile app",
          status: "Review",
          priority: "Medium",
          statusColor: "bg-purple-500",
          priorityColor: "bg-yellow-100 text-yellow-800",
          date: "23 Oct 2023",
          avatar: "bg-purple-500",
          borderColor: "border-yellow-400",
        },
      ],
    },
    {
      id: "oct23",
      title: "23 Oct 2023",
      count: null,
      tasks: [
        {
          id: 2,
          title: "Design description banner & landing page",
          status: "Task",
          priority: "Inprogress",
          statusColor: "bg-blue-500",
          priorityColor: "bg-orange-100 text-orange-800",
          date: "23 Oct 2023",
          avatar: "bg-blue-500",
          borderColor: "border-orange-400",
        },
        {
          id: 3,
          title: "Make sure all the padding should be 24px",
          status: "Calls",
          priority: "Completed",
          statusColor: "bg-teal-500",
          priorityColor: "bg-green-100 text-green-800",
          date: "23 Oct 2023",
          avatar: "bg-blue-500",
          borderColor: "border-green-400",
          completed: true,
        },
      ],
    },
    {
      id: "oct22",
      title: "22 Oct 2023",
      count: null,
      tasks: [
        {
          id: 6,
          title: "Setup deployment pipeline",
          status: "DevOps",
          priority: "High",
          statusColor: "bg-indigo-500",
          priorityColor: "bg-red-100 text-red-800",
          date: "22 Oct 2023",
          avatar: "bg-red-500",
          borderColor: "border-red-400",
        },
        {
          id: 7,
          title: "Write unit tests for API endpoints",
          status: "Testing",
          priority: "Completed",
          statusColor: "bg-green-500",
          priorityColor: "bg-green-100 text-green-800",
          date: "22 Oct 2023",
          avatar: "bg-green-500",
          borderColor: "border-green-400",
          completed: true,
        },
      ],
    },
  ];

  const TaskCard = ({ task }) => (
    <div className={`border-l-4 ${task.borderColor} bg-white mb-3`}>
      <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
        <div className="flex items-center space-x-3">
          <button className="text-gray-400 hover:text-gray-600">
            <GripVertical className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-3">
            <h4
              className={`text-sm font-medium ${
                task.completed ? "line-through text-gray-500" : "text-gray-900"
              }`}
            >
              {task.title}
            </h4>
          </div>

          <div className="flex items-center space-x-2">
            <span
              className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium text-white ${task.statusColor}`}
            >
              {task.status}
            </span>
            <span
              className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${task.priorityColor}`}
            >
              {task.priority}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{task.date}</span>
          </div>

          <div
            className={`w-8 h-8 ${task.avatar} rounded-full flex items-center justify-center`}
          >
            <span className="text-white text-xs font-medium">U</span>
          </div>

          <div className="relative">
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={() => handleDropdownToggle(task.id)}
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {dropdownOpen === task.id && (
              <div className="absolute right-0 top-8 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <Edit className="w-4 h-4 mr-2 text-purple-500" />
                  Edit
                </button>
                <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <Trash2 className="w-4 h-4 mr-2 text-red-500" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const AccordionSection = ({ title, section, count, children }) => (
    <div className="mb-6">
      <button
        onClick={() => toggleSection(section)}
        className="flex items-center justify-between w-full text-left mb-3"
      >
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          {count && (
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
              {count}
            </span>
          )}
        </div>
        {expandedSections[section] ? (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {expandedSections[section] && <div className="space-y-0">{children}</div>}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-4">
          <select className="text-lg font-semibold border-none bg-transparent">
            <option>All Tasks</option>
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 text-sm text-gray-600">
            <input type="checkbox" className="text-purple-600" />
            <span>Mark all as read</span>
          </label>

          <select className="text-sm border border-gray-300 rounded px-2 py-1">
            <option>Sort</option>
          </select>

          <div className="text-sm text-gray-500">06/18/2025 - 06/24/2025</div>

          <button className="text-sm text-purple-600 border border-purple-600 rounded px-3 py-1">
            Filter
          </button>
        </div>
      </div>

      {taskSections.map((section) => (
        <AccordionSection
          key={section.id}
          title={section.title}
          section={section.id}
          count={section.count}
        >
          {section.tasks.length === 0 ? (
            <div className="text-gray-500 text-sm py-4">No tasks</div>
          ) : (
            section.tasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </AccordionSection>
      ))}
    </div>
  );
};

export default TaskAccordionUI;
