/* eslint-disable no-unused-vars */
export default function StepperControl({ handelClick, currentStep, steps }) {
  return (
    <div className="container flex justify-around mt-4 mb-8">
      {/* BACK BUTTON */}
      <button
        onClick={() => handelClick("back")}
        className={`${
          currentStep == 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        } bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold  border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out`}
      >
        Back
      </button>
      {/* NEXT BUTTON */}
      <button
        type="submit"
        onClick={() => handelClick("next")}
        className="bg-curawell text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer  hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
      >
        {currentStep == steps.length - 1 ? "Confirm" : "Next"}
      </button>
    </div>
  );
}
