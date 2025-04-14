import { useEffect, useState } from "react";
import axios from "axios";
import MaterialCardItem from "./MaterialCardItem";

const StudyMaterialSection = ({ courseId, course }) => {
  const [studyTypeContent, setStudyTypeContent] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    setLoading(true);
    setError(null);
    try {
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "ALL",
      });
      setStudyTypeContent(result.data);
    } catch (error) {
      setError("Failed to fetch study materials.");
      console.error("Error fetching study materials:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-10">
      <div className="mb-4">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
          📚 Study Material
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Choose your preferred method to learn effectively.
        </p>
      </div>

      {loading && (
        <div className="text-center py-6">
          <span className="text-xl text-gray-500">Loading...</span>
        </div>
      )}
      {error && (
        <div className="text-center py-6">
          <span className="text-xl text-red-500">{error}</span>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MaterialList.map((item, index) => (
            <MaterialCardItem
              key={index}
              item={item}
              studyTypeContent={studyTypeContent}
              course={course}
              refreshData={GetStudyMaterial}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default StudyMaterialSection;
