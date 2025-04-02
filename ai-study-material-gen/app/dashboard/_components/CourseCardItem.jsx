import React from 'react';
import Image from 'next/image';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from 'lucide-react';
import Link from 'next/link';

const CourseCardItem = ({ course }) => {
  return (
    <div className="border rounded-lg shadow-md p-5 flex flex-col h-full bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <Image 
            src={'/knowledge.png'}
            alt="other"
            width={50}
            height={50}
          />
          <div className="mt-3 flex justify-end">
            {course?.status === 'Generating' ? (
              <h2 className="text-sm p-1 px-2 rounded-full bg-gray-500 text-white flex gap-2 items-center">
                <RefreshCcw className="h-5 w-5"/>Generating...
              </h2>
            ) : (
              <Link href={'/course/'+course?.courseId}>
                <Button className="bg-blue-500 hover:bg-gray-400">View</Button>
              </Link>
            )}
          </div>
        </div>
        <h2 className="mt-3 font-medium text-lg">{course?.courseLayout?.course_title}</h2>
        <p className="text-sm text-gray-500 line-clamp-3 mt-2">{course?.courseLayout?.course_summary}</p>
        
        {/* Hardcoded Creation Date */}
        <p className="text-xs text-gray-400 mt-2 mb-2">Created on: 27-March-25</p>
      </div>

      {/* Fixed Progress Bar at the Bottom */}
      <div className="mt-auto">
        <Progress value={10} />
      </div>
    </div>
  );
};

export default CourseCardItem;
