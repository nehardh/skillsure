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
    <div className=" flex flex-col items-center text-black">
      <div className="w-full max-w-xl space-y-8">
        {/* Topic Input Box */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
          <label className="block text-lg font-semibold text-gray-800 mb-3">
            Topic or Prompt
          </label>
          <Textarea
            aria-label="Topic input"
            placeholder="E.g. Introduction to Machine Learning..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        {/* Difficulty Selector */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
          <label className="block text-lg font-semibold text-gray-800 mb-3">
            Difficulty Level
          </label>
          <Select onValueChange={(value) => setDifficultyLevel(value)}>
            <SelectTrigger className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-lg border border-gray-200 rounded-xl">
              <SelectItem value="easy" className="p-3 hover:bg-blue-50 cursor-pointer rounded-md">
                Easy
              </SelectItem>
              <SelectItem value="moderate" className="p-3 hover:bg-blue-50 cursor-pointer rounded-md">
                Moderate
              </SelectItem>
              <SelectItem value="complex" className="p-3 hover:bg-blue-50 cursor-pointer rounded-md">
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
