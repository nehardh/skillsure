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
  }, [courseId]);

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
    <div className="px-4 md:px-10 lg:px-28 xl:px-48 mt-10 mb-16 space-y-12">
      {loading ? (
        <p className="text-center text-gray-500">Loading course details...</p>
      ) : (
        <>
          {/* Course Introduction */}
          <section>
            <CourseIntroCard course={course} />
          </section>

          {/* Study Material Options */}
          <section>
            <StudyMaterialSection courseId={courseId} course={course} />
          </section>

          {/* Chapter List */}
          <section>
            <ChapterList course={course} />
          </section>
        </>
      )}
    </div>
  );
}

export default Course;
