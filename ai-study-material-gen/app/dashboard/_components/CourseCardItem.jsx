import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';
import Link from 'next/link';

const CourseCardItem = ({ course }) => {
  // Optional: format date if available
  const creationDate = course?.createdAt
    ? new Date(course.createdAt).toLocaleDateString("en-GB", {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : "27-Mar-25"; // fallback

  return (
    <div className="border rounded-xl shadow-sm p-5 flex flex-col h-full bg-gradient-to-br from-blue-50 to-gray-50 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <Image src="/knowledge.png" alt="icon" width={48} height={48} />
        {course?.status === 'Generating' ? (
          <span className="text-xs px-2 py-1 rounded-full bg-gray-600 text-white flex items-center gap-1">
            <RefreshCcw className="h-4 w-4 animate-spin" />
            Generating...
          </span>
        ) : (
          <Link href={`/course/${course?.courseId}`}>
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
              View
            </Button>
          </Link>
        )}
      </div>

      {/* Title & Summary */}
      <h2 className="font-semibold text-lg text-gray-800">
        {course?.courseLayout?.course_title || "Untitled"}
      </h2>
      <p className="text-sm text-gray-600 mt-1 line-clamp-3">
        {course?.courseLayout?.course_summary || "No summary provided."}
      </p>

      {/* Creation Date */}
      <p className="text-xs text-gray-400 mt-4">Created on: {creationDate}</p>
    </div>
  );
};

export default CourseCardItem;
