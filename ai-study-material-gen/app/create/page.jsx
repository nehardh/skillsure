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

    try {
      setLoading(true);
      const courseId = uuidv4();
      const result = await axios.post("/api/generate-course-outline", {
        courseId: courseId,
        ...formData,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      console.log("AI Generated Course:", result.data.result.response);
      setLoading(false);
      router.replace("/dashboard");
      toast.success("Your course content is being generated. Please wait, and then click Refresh.");
    } catch (error) {
      console.error("Error generating course outline:", error);
      setLoading(false);
      toast.error("Failed to generate course outline. Please try again.");
    }
  };

  return (
    <div>
      <DashboardHeader />

      <div className="flex flex-col items-center justify-center px-4 sm:px-10 md:px-20 lg:px-36 mt-8">
        <div className="max-w-3xl text-center space-y-4 mb-2">
          <h2 className="font-bold text-4xl text-primary">
            Create Your Own Personalized Study Material
          </h2>
          <p className="text-gray-600 text-lg">
            Enter a topic and generate high-quality study resources tailored to your learning style.
          </p>
        </div>

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

          <div className="flex justify-between mt-10">
            {step !== 0 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Previous
              </Button>
            ) : (
              <div />
            )}
            {step === 0 ? (
              <Button onClick={() => setStep(step + 1)}>Next</Button>
            ) : (
              <Button onClick={GenerateCourseOutline} disabled={loading}>
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
