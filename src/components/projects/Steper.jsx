import React from "react";

const stepColors = {
  0: "bg-purple-700 text-white", // Plan
  1: "bg-orange-500 text-white", // Design
  2: "bg-blue-500 text-white", // Development
  3: "bg-green-500 text-white", // Completed
};
const steps = ["Plan", "Design", "Development", "Completed"];

export const StepProgress = ({ currentStep }) => {
  console.log(currentStep, "currentStep");

  return (
    <div className="flex w-full bg-white gap-[2px] px-2 py-2 rounded">
      {steps.map((step, index) => {
        const isCurrent = index === currentStep;
        const isCompleted = index < currentStep;

        let bgColor = "bg-gray-200 text-gray-400";
        if (isCurrent || isCompleted) {
          bgColor = stepColors[index];
        }

        return (
          <div
            key={index}
            className={`relative px-6 py-2 w-full ${bgColor} text-center font-medium text-sm flex justify-center items-center`}
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%, 12px 50%)",
            }}
          >
            {step}
          </div>
        );
      })}
    </div>
  );
};
