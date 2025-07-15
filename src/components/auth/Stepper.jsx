/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react";
import useRegisterForm from "../../hooks/useRegisterForm";
export default function Stepper({ steps, currentStep, setCurrents }) {
  const { newStep, setNewStep } = useRegisterForm();
  const steRef = useRef();
  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    let count = 0;
    while (count < newSteps.length) {
      //current Step
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: true,
        };
        count++;
      }
      //step Completed
      else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      }
      //step Pending
      else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }
    return newSteps;
  };
  useEffect(() => {
    const stepsState = steps.map((step, index) => {
      return {
        description: step,
        completed: false,
        highlighted: index === 0 ? true : false,
        selected: index === 0 ? true : false,
      };
    });
    steRef.current = stepsState;
    const current = updateStep(currentStep - 1, steRef.current);

    setNewStep(current);
  }, [steps, currentStep]);

  const displaySteps = newStep.map((step, index) => {
    return (
      <div
        key={index}
        className={
          index !== newStep.length - 1
            ? "w-full flex items-center"
            : "flex items-center"
        }
      >
        <div className="realtive flex flex-col items-center text-blimo ">
          <div
            className={`rounded-full transition duration-500 ease-in-out border-2 border-greem-300 h-12 w-12 flex  items-center justify-center py-3 ${
              step.selected ? "bg-curawell text-white font-bold border" : ""
            }`}
          >
            {/* Display Number */}
            {step.completed ? (
              <span className="text-white font-bold text-xl">&#10003;</span>
            ) : (
              index + 1
            )}
          </div>
          <div
            className={`absolute  text-center mt-16 w-32  font-cairo text-sm font-bold uppercase ${
              step.highlighted || step.completed
                ? "text-curawell"
                : "text-blimo"
            }`}
          >
            {step.description}
          </div>
        </div>
        <div
          className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
            step.completed ? "border-curawell" : "border-blimo"
          }`}
        >
          {/* Display Line */}
        </div>
      </div>
    );
  });
  return (
    <div className="mx-4 p-4 flex justify-between items-center">
      {displaySteps}
    </div>
  );
}
