"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import CourseCardItem from "./CourseCardItem";
import { Button } from "@/components/ui/button";
import { RefreshCw, BookOpen } from "lucide-react";
import Link from "next/link";

function CourseList() {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) GetCourseList();
  }, [user]);

  const GetCourseList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/courses", {
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      setCourseList(result.data.result);
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-12 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">📘 Your Courses</h2>
          <p className="text-sm text-gray-500 mt-1">
            All your AI-generated study material, neatly organized.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/create">
            <Button className="bg-black hover:bg-gray-800 text-white rounded-lg">
              Create New +
            </Button>
          </Link>
          <Button
            variant="outline"
            className="gap-2 rounded-lg border-gray-300"
            onClick={GetCourseList}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading && "animate-spin"}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-52 bg-gray-100 rounded-xl animate-pulse border border-gray-200"
            />
          ))
        ) : courseList?.length > 0 ? (
          courseList.map((course, index) => (
            <CourseCardItem key={index} course={course} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-500">
            <BookOpen className="h-10 w-10 mb-3 text-gray-400" />
            <p className="text-lg font-medium">No study materials yet</p>
            <p className="text-sm text-gray-400 mb-4">
              Create your first course to get started.
            </p>
            <Link href="/create">
              <Button className="bg-black hover:bg-gray-800 text-white rounded-lg">
                Create New +
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default CourseList;
