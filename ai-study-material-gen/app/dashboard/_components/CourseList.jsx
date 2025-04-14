"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import CourseCardItem from "./CourseCardItem";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

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
    <section className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Your Study Material
        </h2>
        <Button
          variant="outline"
          className="gap-2 text-sm"
          onClick={GetCourseList}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading && "animate-spin"}`} />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {!loading ? (
          courseList?.length > 0 ? (
            courseList.map((course, index) => (
              <CourseCardItem key={index} course={course} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full">No study materials found.</p>
          )
        ) : (
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-56 w-full bg-slate-200 rounded-lg animate-pulse"
            />
          ))
        )}
      </div>
    </section>
  );
}

export default CourseList;
