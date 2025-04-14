import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

const ChapterList = ({ course }) => {
  const CHAPTERS = course?.courseLayout?.chapters;

  return (
    <div className="mt-6">
      <h2 className="font-semibold text-2xl mb-4">📖 Chapters</h2>

      <div className="space-y-4 md:space-y-6">
        {CHAPTERS?.map((chapter, index) => (
          <Card 
            key={index} 
            className="p-5 border border-gray-200 shadow-md rounded-xl flex items-center 
                      justify-between cursor-pointer transition-all hover:scale-105 hover:shadow-lg h-24 sm:h-28 md:h-32"
          >
            <CardContent className="p-0 flex flex-col gap-1">
              <h3 className="font-medium text-lg line-clamp-1">{chapter?.chapter_title}</h3>
              <p className="text-gray-500 text-sm line-clamp-2">{chapter?.chapter_summary}</p>
            </CardContent>
            <ChevronRight className="text-gray-400" size={22} />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChapterList;
