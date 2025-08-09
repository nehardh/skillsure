import React from "react";

function StepProgress({ stepCount, setStepCount, data }) {
  return (
    <div className="flex gap-4 items-center w-full">
      {/* Back Button */}
      {stepCount !== 0 && (
        <button
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition"
          onClick={() => setStepCount(stepCount - 1)}
        >
          Back
        </button>
      )}

      {/* Step Indicators */}
      <div className="flex flex-1 gap-2">
        {data?.map((_, index) => (
          <div
            key={index}
            className={`flex-1 h-2 rounded-full transition-all duration-300 ${
              index <= stepCount ? "bg-primary" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default StepProgress;
