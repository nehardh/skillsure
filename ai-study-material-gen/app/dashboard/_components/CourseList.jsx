"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import CourseCardItem from "./CourseCardItem";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">📘 Your Courses</h2>
          <p className="text-sm text-gray-500 mt-1">All your study material in one place.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/create">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">Create New +</Button>
          </Link>
          <Button
            variant="outline"
            className="gap-2"
            onClick={GetCourseList}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading && "animate-spin"}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-52 bg-gray-200 rounded-lg animate-pulse" />
          ))
        ) : courseList?.length > 0 ? (
          courseList.map((course, index) => (
            <CourseCardItem key={index} course={course} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-10">
            No study materials found.
          </div>
        )}
      </div>
    </section>
  );
}

export default CourseList;
