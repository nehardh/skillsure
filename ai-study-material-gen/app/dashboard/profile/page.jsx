"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";

const ProfilePage = () => {
  const { user } = useUser();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch user courses/materials
  useEffect(() => {
    if (user) {
      fetchUserCourses();
    }
  }, [user]);

  const fetchUserCourses = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/courses", {
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      setCourses(result.data.result || []);
    } catch (err) {
      console.error("Error fetching user courses:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Profile Header */}
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <img
            src={user.imageUrl}
            alt="User Profile"
            className="w-24 h-24 rounded-full border border-gray-300 object-cover"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-xl font-bold text-gray-900">{user.fullName}</h1>
            <p className="text-gray-600">{user.primaryEmailAddress?.emailAddress}</p>
            <p className="text-gray-400 text-sm mt-1">
              Member since{" "}
              {new Date(user.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Generated Materials */}
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Generated Topics / Materials
          </h2>

          {loading ? (
            <ul className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <li key={i} className="h-5 bg-gray-200 rounded animate-pulse" />
              ))}
            </ul>
          ) : courses.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {courses.map((course) => (
                <li
                  key={course.courseId}
                  className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between"
                >
                  {/* Course Title */}
                  <Link
                    href={`/course/${course.courseId}`}
                    className="text-blue-600 hover:underline text-sm sm:text-base"
                  >
                    {course?.courseLayout?.course_title || "Untitled Material"}
                  </Link>

                  {/* Creation Date */}
                  {course.createdAt && (
                    <span className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-0">
                      {new Date(course.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No materials generated yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
