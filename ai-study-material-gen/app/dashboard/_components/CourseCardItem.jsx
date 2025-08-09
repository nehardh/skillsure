import React from "react";
import Image from "next/image";
import { RefreshCcw } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const CourseCardItem = ({ course, onDelete }) => {
  const creationDate = course?.createdAt
    ? new Date(course.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "27-Mar-25";

  const handleDelete = async (e) => {
    e.preventDefault(); // Prevent link navigation
    const confirmed = window.confirm("Delete this course?");
    if (confirmed) {
      try {
        await onDelete(course.courseId);
        toast.success("Course deleted successfully");
      } catch {
        toast.error("Failed to delete course");
      }
    }
  };

  return (
    <Link href={`/course/${course?.courseId}`} passHref>
      <div className="border border-gray-200 rounded-xl p-5 flex flex-col h-full bg-white hover:shadow-md transition-all duration-200 cursor-pointer group">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <Image
            src="/knowledge.png"
            alt="Course Icon"
            width={40}
            height={40}
            className="rounded"
          />
          {course?.status === "Generating" && (
            <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-white flex items-center gap-1">
              <RefreshCcw className="h-3 w-3 animate-spin" />
              Generating
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="font-semibold text-lg text-gray-900 group-hover:text-black line-clamp-1">
          {course?.courseLayout?.course_title || "Untitled"}
        </h2>

        {/* Summary */}
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {course?.courseLayout?.course_summary || "No summary provided."}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-4 flex justify-between items-center text-xs text-gray-400">
          <span>Created {creationDate}</span>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CourseCardItem;
