"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Quiz() {
    const { courseId } = useParams();
    const [quizData, setQuizData] = useState([]);

    useEffect(() => {
        GetQuiz();
    }, [])

    const GetQuiz = async () => {
        const result = await axios.post('/api/study-type', {
            courseId: courseId,
            studyType: 'Quiz',
        });
        setQuizData(result?.data);
        //console.log(result);
    }

  return (
    <div>Quiz</div>
  )
}

export default Quiz