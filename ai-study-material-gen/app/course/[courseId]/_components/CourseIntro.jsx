import React from "react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";

const CourseIntroCard = ({ course }) => {
  return (
    <div className="flex gap-6 items-center p-6 border rounded-2xl shadow-lg bg-white transition hover:shadow-xl">
      {/* Course Thumbnail */}
      <div className="relative w-20 h-20 flex-shrink-0">
        <Image
          src={"/knowledge.png"}
          alt="Course Thumbnail"
          layout="fill"
          objectFit="contain"
        />
      </div>

      {/* Course Details */}
      <div className="flex-1">
        <h2 className="font-bold text-xl text-gray-900">{course?.courseLayout?.course_title}</h2>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{course?.courseLayout?.course_summary}</p>

        {/* Progress Bar */}
        <div className="mt-4">
          <Progress value={course?.progress || 0} className="h-2 bg-gray-200" />
        </div>

        {/* Chapters Count */}
        <h2 className="mt-3 text-sm font-medium text-primary">
          Total Chapters: {course?.courseLayout?.chapters?.length || 0}
        </h2>
      </div>
    </div>
  );
};

export default CourseIntroCard;
