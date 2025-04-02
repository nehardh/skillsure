import { Textarea } from "@/components/ui/textarea";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TopicInput = ({ setTopic, setDifficultyLevel }) => {
  return (
    <div className="mt-10 flex flex-col items-center text-black">
      {/* Wrapper for Consistent Width */}
      <div className="max-w-lg w-full space-y-6">
        {/* Topic Input Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <h2 className="text-lg font-semibold text-gray-800">Enter the topic or paste the prompt to generate</h2>
          <Textarea
            aria-label="Topic input"
            className="w-full p-4 mt-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            placeholder="Enter topic or paste the prompt..."
            onChange={(event) => setTopic(event.target.value)}
          />
        </div>

        {/* Difficulty Level Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
          <h2 className="text-lg font-semibold text-gray-800">Select the difficulty level</h2>
          <Select onValueChange={(value) => setDifficultyLevel(value)}>
            <SelectTrigger className="w-full border border-gray-300 rounded-lg p-4 mt-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent className="w-full bg-white shadow-md rounded-xl border border-gray-300">
              <SelectItem value="easy" className="p-4 hover:bg-blue-50 transition duration-200">
                Easy
              </SelectItem>
              <SelectItem value="moderate" className="p-4 hover:bg-blue-50 transition duration-200">
                Moderate
              </SelectItem>
              <SelectItem value="complex" className="p-4 hover:bg-blue-50 transition duration-200">
                Complex
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default TopicInput;
