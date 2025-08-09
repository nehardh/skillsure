import React, { useState } from "react";
import Image from "next/image";

const SelectOption = ({ selectedStudyType }) => {
  const options = [
    { name: "Exam", icon: "/exam_1.png" },
    { name: "Job Interview", icon: "/job.png" },
    { name: "Practice", icon: "/practice.png" },
    { name: "Coding", icon: "/code.png" },
    { name: "Other", icon: "/knowledge.png" },
  ];

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelect = (option) => {
    setSelectedOption(option.name);
    selectedStudyType(option.name);
  };

  return (
    <div className="w-full">
      <h2 className="text-center text-lg font-semibold text-gray-700 mt-8">
        Select the purpose for your study material
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
        {options.map((option) => {
          const isSelected = option.name === selectedOption;
          return (
            <div
              key={option.name}
              role="button"
              tabIndex={0}
              onClick={() => handleSelect(option)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleSelect(option);
              }}
              className={`p-6 flex flex-col items-center justify-center rounded-xl border 
                shadow-md transition-all duration-300 cursor-pointer outline-none
                ${isSelected 
                  ? "border-transparent bg-gradient-to-br from-blue-500/10 to-blue-600/10 ring-2 ring-blue-500" 
                  : "border-gray-200 hover:border-blue-300 hover:shadow-lg"
                }
                hover:scale-[1.03] active:scale-[0.98]
              `}
              aria-pressed={isSelected}
              aria-label={`Select ${option.name}`}
            >
              <Image
                src={option.icon}
                alt={`${option.name} icon`}
                width={60}
                height={60}
                className="select-none"
              />
              <h3
                className={`text-sm font-medium mt-3 transition-colors duration-300 ${
                  isSelected ? "text-blue-600 font-semibold" : "text-gray-600"
                }`}
              >
                {option.name}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectOption;
