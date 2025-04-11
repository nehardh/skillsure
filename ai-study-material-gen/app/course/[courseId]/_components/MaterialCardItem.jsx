import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

const MaterialCardItem = ({ item, studyTypeContent, course, refreshData }) => {
  const [loading, setLoading] = useState(false);

  // Pull status from studyTypeContent (recommended over course.status if status varies by type)
  const status = studyTypeContent?.[item.type]?.status;
  const isReady = status === "Ready";
  const isGenerating = status === "Generating" || loading;

  const GenerateContent = async () => {
    toast("Content is being generated, please wait!");
    setLoading(true);

    let chapters = '';
    course?.courseLayout?.chapters.forEach((chapter) => {
      chapters = chapter.chapter_title + ", " + chapters;
    });

    try {
      await axios.post('/api/study-type-content', {
        courseId: course?.courseId,
        type: item.name,
        chapters,
      });

      toast.success("Your content generation has started!");
      refreshData(true); // Triggers status check
    } catch (error) {
      toast.error("Error generating content!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`border shadow-md rounded-lg p-5 flex flex-col items-center transition-transform duration-200 hover:scale-[1.02] ${
        !isReady && 'grayscale'
      }`}
    >
      <h2
        className={`p-1 px-2 rounded-full text-[10px] mb-2 ${
          isReady ? 'bg-green-500' : 'bg-gray-500'
        } text-white`}
      >
        {isGenerating && <RefreshCcw className="animate-spin w-3 h-3 inline-block mr-1" />}
        {isReady ? "View" : isGenerating ? "Generating..." : "Generate"}
      </h2>

      <Image src={item.icon} alt={item.name} width={50} height={50} />

      <h2 className="font-medium mt-3">{item.name}</h2>
      <p className="text-gray-500 text-sm text-center">{item.desc}</p>

      {isReady ? (
        <Link href={`/course/${course?.courseId}/${item.path}`} className="w-full mt-3">
          <Button variant="outline" className="w-full">View</Button>
        </Link>
      ) : (
        <Button
          variant="outline"
          className="mt-3 w-full"
          onClick={(e) => {
            e.stopPropagation();
            GenerateContent();
          }}
          disabled={isGenerating}
        >
          {isGenerating ? "Generating..." : "Generate"}
        </Button>
      )}
    </div>
  );
};

export default MaterialCardItem;
