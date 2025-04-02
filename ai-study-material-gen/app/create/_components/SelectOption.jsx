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

  return (
    <div className="w-full">
      <h2 className="text-center text-lg font-semibold text-gray-700 mt-8">
        Select the purpose for your study material
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-4">
        {options.map((option) => (
          <div
            key={option.name} // Using name for key prop
            className={`p-5 flex flex-col items-center justify-center bg-white shadow-md rounded-xl border 
              hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer 
              ${option.name === selectedOption ? "border-primary bg-primary/10" : "border-gray-200"}`}
            onClick={() => {
              setSelectedOption(option.name); 
              selectedStudyType(option.name);
            }}
            aria-label={`Select ${option.name} option`} // Accessibility improvement
          >
            <Image src={option.icon} alt={option.name} width={60} height={60} />
            <h2
              className={`text-sm font-medium mt-3 transition-colors duration-300 ${
                option.name === selectedOption ? "text-primary font-semibold" : "text-gray-600"
              }`}
            >
              {option.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectOption;
