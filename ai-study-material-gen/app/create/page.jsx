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
  const [step, setStep] = useState(0); // Manages step navigation
  const [formData, setFormData] = useState({}); // Changed from [] to {} for correct state structure
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handles user input and updates formData state
  const handleUserInput = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  /*
    Saves user input and generates course layout using AI
  */
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
      router.replace('/dashboard');
      //Toast Notification
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
      <div className="flex flex-col items-center p-5 md:px-24 lg:px-36 mt-20">
       {/* Add the DashboardHeader component at the top */}

      <h2 className="font-bold text-4xl text-primary text-center">
        Create Your Own Personalized Study Material
      </h2>
      <p className="text-gray-500 text-lg text-center">
        Simply enter a topic to generate high-quality study resources tailored to your needs.
      </p>

      <div className="mt-10">
        {step === 0 ? (
          <SelectOption
            selectedStudyType={(value) => handleUserInput("courseType", value)}
          />
        ) : (
          <TopicInput
            setTopic={(value) => handleUserInput("topic", value)}
            setDifficultyLevel={(value) =>
              handleUserInput("difficultyLevel", value)
            }
          />
        )}
      </div>

      <div className="flex justify-between w-full mt-10">
        {step !== 0 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            Previous
          </Button>
        )}
        {step === 0 ? (
          <Button onClick={() => setStep(step + 1)}>Next</Button>
        ) : (
          <Button onClick={GenerateCourseOutline} disabled={loading}>
            {loading ? <Loader className="animate-spin" /> : "Generate"}
          </Button>
        )}
      </div>
    </div>
    </div>
    
  );
};

export default Create;
