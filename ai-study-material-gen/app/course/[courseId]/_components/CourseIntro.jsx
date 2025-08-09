import React from "react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";

const CourseIntroCard = ({ course }) => {
  const chaptersCount = course?.courseLayout?.chapters?.length || 0;
  const progressValue = course?.progress || 0;

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50">
        <Image
          src="/knowledge.png"
          alt="Course Thumbnail"
          fill
          className="object-contain p-2"
          sizes="80px"
        />
      </div>

      {/* Details */}
      <div className="flex-1 w-full">
        <h2 className="font-semibold text-lg md:text-xl text-gray-900">
          {course?.courseLayout?.course_title || "Untitled Course"}
        </h2>
        <p className="text-gray-600 text-sm md:text-base mt-1 line-clamp-2">
          {course?.courseLayout?.course_summary || "No summary available."}
        </p>

        {/* Progress */}
        <div className="mt-4">
          <Progress value={progressValue} className="h-2 bg-gray-100" />
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>{progressValue}% Complete</span>
            <span>{chaptersCount} Chapters</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseIntroCard;
