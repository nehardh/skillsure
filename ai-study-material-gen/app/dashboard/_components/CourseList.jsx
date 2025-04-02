"use client"
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import CourseCardItem from './CourseCardItem';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

function CourseList() {
    const { user } = useUser();
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect (() => {
        user && GetCourseList();
    }, [user]);
    const GetCourseList = async () => {
      setLoading(true);
      const result = await axios.post('/api/courses', {
        createdBy: user?.primaryEmailAddress?.emailAddress
      })
      console.log(result.data.result);
      setCourseList(result.data.result);
      setLoading(false);
    }
  return (
    <div className="mt-8">
      <h2 className="font-bold text-2xl flex justify-between items-center">
        Your Study Material
        <Button variant="outline" className="border-primary" onClick={GetCourseList}><RefreshCw />Refresh</Button>
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-5">
        {loading == false ? courseList?.map((course, index) => (
          <CourseCardItem key={index} course={course} />
        )): [1,2,3,4,5,6].map((item, index) => (
          <div key={index} className="h-56 w-full bg-slate-200 rounded-lg animate-pulse"></div>
        ))}
      </div>
    </div>
  )
}

export default CourseList