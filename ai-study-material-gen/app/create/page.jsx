"use client";
import React, { useState } from "react";
import SelectOption from "./_components/SelectOption";
import { Button } from "@/components/ui/button";
import TopicInput from "./_components/TopicInput";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DashboardHeader from "../dashboard/_components/DashboardHeader";

const Create = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUserInput = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const GenerateCourseOutline = async () => {
    if (!formData.courseType || !formData.topic || !formData.difficultyLevel) {
      toast.error("Please fill in all the fields before generating.");
      return;
    }

    setLoading(true);
    try {
      const courseId = uuidv4();
      await axios.post("/api/generate-course-outline", {
        courseId,
        ...formData,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      toast.success("Your course is being generated! Refresh your dashboard soon.");
      router.replace("/dashboard");
    } catch (error) {
      console.error("Error generating course outline:", error);
      if (error.response?.status === 503) {
        toast.error("AI service is overloaded. Try again in a moment.");
      } else {
        toast.error("Failed to generate course. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <DashboardHeader />
      <div className="flex flex-col items-center px-4 sm:px-10 md:px-20 lg:px-36 mt-8">
        {/* Step Indicator */}
        <div className="flex gap-2 mb-6">
          {[0, 1].map((s) => (
            <div
              key={s}
              className={`h-2 w-16 rounded-full transition-all ${
                step >= s ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <div className="max-w-3xl text-center space-y-4 mb-2">
          <h2 className="font-bold text-4xl text-primary">
            Create Your Personalized Study Material
          </h2>
          <p className="text-gray-600 text-lg">
            Generate high-quality notes & quizzes tailored to your learning style.
          </p>
        </div>

        {/* Form Card */}
        <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-md p-4 sm:p-10 max-w-2xl transition-all">
          {step === 0 ? (
            <SelectOption
              selectedStudyType={(value) => handleUserInput("courseType", value)}
            />
          ) : (
            <TopicInput
              setTopic={(value) => handleUserInput("topic", value)}
              setDifficultyLevel={(value) => handleUserInput("difficultyLevel", value)}
            />
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10">
            {step > 0 ? (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="w-28"
              >
                Previous
              </Button>
            ) : (
              <div />
            )}
            {step < 1 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!formData.courseType}
                className="w-28"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={GenerateCourseOutline}
                disabled={loading}
                className="w-32"
              >
                {loading ? <Loader className="animate-spin w-4 h-4" /> : "Generate"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
