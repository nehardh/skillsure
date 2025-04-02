import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const StudyMaterialSection = ({ courseId }) => {
  const [studyTypeContent, setStudyTypeContent] = useState();

  const MaterialList = [
    {
      name: "Notes/Chapters",
      desc: "Read notes to prepare!",
      icon: "/notes.png",
      path: "/notes",
      type: "notes",
    },
    {
      name: "Flashcard",
      desc: "Create flashcards to remember!",
      icon: "/flashcard.png",
      path: "/flashcards",
      type: "FlashCard",
    },
    {
      name: "Quiz",
      desc: "Test your knowledge!",
      icon: "/quiz.png",
      path: "/quiz",
      type: "Quiz",
    },
    {
      name: "QnA",
      desc: "Ask questions and get answers!",
      icon: "/qa.png",
      path: "/qa",
      type: "Qa",
    },
  ];

  useEffect(() => {
    GetStudyMaterial();
  }, []);

  const GetStudyMaterial = async () => {
    try {
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "ALL",
      });
      setStudyTypeContent(result.data);
    } catch (error) {
      console.error("Error fetching study materials:", error);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="font-semibold text-2xl text-gray-900">📚 Study Material</h2>
      <p className="text-gray-600 text-sm mt-1">
        Choose your preferred method to learn effectively.
      </p>

      {/* Grid Layout with Uniform Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-5">
        {MaterialList.map((item, index) => (
          <Link key={index} href={`/course/${courseId}${item.path}`}>
            <div className="transition-all border p-5 rounded-xl shadow-md hover:shadow-lg bg-white 
                            flex flex-col items-center text-center cursor-pointer h-48">
              <img src={item.icon} alt={item.name} className="w-16 h-16" />
              <h3 className="text-lg font-semibold text-gray-800 mt-3">{item.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default StudyMaterialSection;
