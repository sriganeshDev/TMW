import React, { useState } from "react";
import { Check, ArrowDown } from "lucide-react";

const PipelineDropdown = ({
  projectData,
  onStatusChange,
  onShowConfirmModal,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const pipelineOptions = [
    { value: "Develop", label: "Develop", color: "green" },
    { value: "Completed", label: "Completed", color: "blue" },
  ];

  const getCurrentOption = () => {
    return (
      pipelineOptions.find(
        (option) => option.value === projectData?.pipeLine
      ) || pipelineOptions[0]
    );
  };

  const handleOptionClick = (option) => {
    setIsDropdownOpen(false);

    const currentStatus = projectData?.pipeLine;

    // Show confirmation for both transitions
    if (option.value === "Completed" && currentStatus !== "Completed") {
      // Show confirmation modal for closing project
      onShowConfirmModal(option.value);
    } else if (option.value === "Develop" && currentStatus === "Completed") {
      // Show confirmation modal for reopening project
      onShowConfirmModal(option.value);
    } else {
      // Direct update for same status or other cases
      onStatusChange(option.value);
    }
  };

  const currentOption = getCurrentOption();

  const getColorClasses = (color) => {
    switch (color) {
      case "green":
        return "bg-green-100 text-green-800 border-green-200";
      case "blue":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-200 hover:shadow-sm ${getColorClasses(
          currentOption.color
        )}`}
      >
        <Check className="w-4 h-4" />
        <span>{currentOption.label}</span>
        <ArrowDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isDropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsDropdownOpen(false)}
          />

          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <div className="py-1">
              {pipelineOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleOptionClick(option)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-150 flex items-center space-x-2 ${
                    currentOption.value === option.value ? "bg-gray-50" : ""
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      option.color === "green" ? "bg-green-500" : "bg-blue-500"
                    }`}
                  />
                  <span className="text-gray-700">{option.label}</span>
                  {currentOption.value === option.value && (
                    <Check className="w-4 h-4 text-gray-500 ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PipelineDropdown;
