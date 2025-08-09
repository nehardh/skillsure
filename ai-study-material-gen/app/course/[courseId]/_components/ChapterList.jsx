import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

const ChapterList = ({ course }) => {
  const CHAPTERS = course?.courseLayout?.chapters || [];

  return (
    <div className="mt-8">
      <h2 className="font-semibold text-2xl mb-5">📖 Chapters</h2>

      <div className="space-y-4 md:space-y-5">
        {CHAPTERS.map((chapter, index) => (
          <Card
            key={index}
            className="group flex items-center justify-between p-5 md:p-6 border border-gray-200 rounded-xl shadow-sm 
                       cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5
                       hover:bg-gradient-to-r hover:from-blue-50 hover:to-white"
          >
            {/* Text */}
            <CardContent className="p-0 flex flex-col gap-1 w-full">
              <h3 className="font-semibold text-base md:text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                {chapter?.chapter_title || "Untitled Chapter"}
              </h3>
              <p className="text-gray-500 text-sm md:text-base line-clamp-2">
                {chapter?.chapter_summary || "No summary available."}
              </p>
            </CardContent>

            {/* Icon */}
            {/* <div className="flex-shrink-0 pl-4">
              <ChevronRight
                className="text-gray-400 group-hover:text-blue-500 transition-colors"
                size={22}
              />
            </div> */}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChapterList;
