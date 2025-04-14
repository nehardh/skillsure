import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

const MaterialCardItem = ({ item, studyTypeContent, course, refreshData }) => {

  const [loading, setLoading] = useState(false);

  const GenerateContent = async () => {
    toast("Content is being generated, pleas wait!")
    setLoading(true);
    let chapters = '';
    course?.courseLayout?.chapters.forEach((chapter) => {
      chapters = (chapter.chapter_title) + ", " + chapters;
    });
     
    const result = await axios.post('/api/study-type-content', {
      courseId: course?.courseId,
      type: item.name,
      chapters: chapters
    });
    console.log(result);  
    setLoading(false);
    refreshData(true);
    toast("Your content is generated!");
  }

  return (
    <Link href={'/course/'+course?.courseId+item.path}>
      <div className={`border shadow-md rounded-lg p-5 flex flex-col items-center ${studyTypeContent?.[item.type]?.length==null && 'grayscale'}`}>
          {studyTypeContent?.[item.type]?.length==null 
            ? <h2 className="p-1 px-2 bg-gray-500 text-white rounded-full text-[10px] mb-2">
              {loading && <RefreshCcw className="animate-spin"/>} Generate</h2> 
            : <h2 className="p-1 px-2 bg-green-500 text-white rounded-full text-[10px] mb-2">View</h2>
          }
          <Image 
              src={item.icon}
              alt={item.name}
              width={50}
              height={50}
          />
          <h2 className="font-medium mt-3">{item.name}</h2>
          <p className="text-gray-500 text-sm text-center">{item.desc}</p>
          {studyTypeContent?.[item.type]?.length==null 
            ? <Button className="mt-3 w-full" variant="outline" onClick={()=> GenerateContent()} >Generate</Button> 
            : <Button className="mt-3 w-full" variant="outline">View</Button>
          }
      </div>
    </Link>
  )
}

export default MaterialCardItem