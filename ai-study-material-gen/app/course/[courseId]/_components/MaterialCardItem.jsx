import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const MaterialCardItem = ({ item, studyTypeContent, course, refreshData }) => {
  const [loading, setLoading] = useState(false);
  const hasContent = Array.isArray(studyTypeContent?.[item.type]) && studyTypeContent[item.type].length > 0;

  const GenerateContent = async () => {
    setLoading(true);
    toast("Generating content, please wait...");

    try {
      const chapters = course?.courseLayout?.chapters
        ?.map((chapter) => chapter.chapter_title)
        .join(", ");

      await axios.post("/api/study-type-content", {
        courseId: course?.courseId,
        type: item.name,
        chapters,
      });

      await refreshData(true);
      toast.success("Your content is ready!");
    } catch (error) {
      toast.error("Failed to generate content. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`border border-gray-200 shadow-sm rounded-xl p-5 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:scale-[1.02] ${
        !hasContent && "opacity-80"
      }`}
    >
      {/* Status Badge */}
      <div
        className={`px-3 py-1 text-[10px] rounded-full font-medium mb-3 ${
          hasContent ? "bg-green-500 text-white" : "bg-gray-400 text-white"
        }`}
      >
        {loading ? (
          <RefreshCcw className="animate-spin w-3 h-3 inline-block mr-1" />
        ) : hasContent ? (
          "Ready"
        ) : (
          "Not Generated"
        )}
      </div>

      {/* Icon */}
      <div className="w-14 h-14 relative">
        <Image src={item.icon} alt={item.name} fill className="object-contain" />
      </div>

      {/* Title */}
      <h2 className="font-semibold mt-4 text-sm md:text-base">{item.name}</h2>
      <p className="text-gray-500 text-xs md:text-sm mt-1">{item.desc}</p>

      {/* Action Button */}
      {hasContent ? (
        <Link href={`/course/${course?.courseId}${item.path}`} className="w-full mt-4">
          <Button className="w-full" variant="outline">
            View
          </Button>
        </Link>
      ) : (
        <Button
          className="w-full mt-4"
          variant="outline"
          disabled={loading}
          onClick={GenerateContent}
        >
          {loading ? <RefreshCcw className="animate-spin w-4 h-4" /> : "Generate"}
        </Button>
      )}
    </div>
  );
};

export default MaterialCardItem;
