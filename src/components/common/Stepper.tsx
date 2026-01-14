import React from "react";
import { CheckCircle2 } from "lucide-react";

interface Step {
  title: string;
  description: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (index: number) => void;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  className = "",
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 -z-10 transform -translate-y-1/2 hidden sm:block"></div>

      <div className="flex justify-between items-center max-w-4xl mx-auto">
        {steps.map((step, index) => {
          const isActive = currentStep === index;
          const isCompleted = currentStep > index;

          return (
            <div
              key={index}
              onClick={() => onStepClick(index)}
              className="flex flex-col items-center gap-2 bg-gray-50 dark:bg-gray-900 px-2 sm:px-4 cursor-pointer group"
            >
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all
                  ${
                    isActive
                      ? "border-blue-600 bg-blue-600 text-white scale-110 shadow-md"
                      : isCompleted
                      ? "border-green-500 bg-green-500 text-white"
                      : "border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800 group-hover:border-blue-400 dark:group-hover:border-blue-500 group-hover:text-blue-500 dark:group-hover:text-blue-400"
                  }
                `}
              >
                {isCompleted ? <CheckCircle2 size={20} /> : index + 1}
              </div>
              <div className="text-center hidden sm:block">
                <p
                  className={`text-xs font-bold ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400"
                  }`}
                >
                  {step.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="sm:hidden text-center mt-4 bg-blue-50 dark:bg-blue-900/20 py-2 rounded-lg">
        <p className="text-sm font-bold text-blue-800 dark:text-blue-300">
          {steps[currentStep].title}
        </p>
        <p className="text-xs text-blue-600 dark:text-blue-400">
          {steps[currentStep].description}
        </p>
      </div>
    </div>
  );
};
