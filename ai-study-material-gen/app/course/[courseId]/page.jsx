"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import CourseIntroCard from "./_components/CourseIntro";
import StudyMaterialSection from "./_components/StudyMaterialSection";
import ChapterList from "./_components/ChapterList";

function Course() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) GetCourse();
  }, [courseId]); // ✅ Now runs only when `courseId` changes.

  const GetCourse = async () => {
    try {
      const { data } = await axios.get(`/api/courses?courseId=${courseId}`);
      setCourse(data.result);
    } catch (error) {
      console.error("Error fetching course data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-10 md:mx-36 lg:px-60 mt-10 mb-5">
      {loading ? (
        <p className="text-center text-gray-500">Loading course details...</p>
      ) : (
        <>
          {/* Course Introduction */}
          <CourseIntroCard course={course} />

          {/* Study Material Options */}
          <StudyMaterialSection courseId={courseId} />

          {/* Chapter List */}
          <ChapterList course={course} />
        </>
      )}
    </div>
  );
}

export default Course;
