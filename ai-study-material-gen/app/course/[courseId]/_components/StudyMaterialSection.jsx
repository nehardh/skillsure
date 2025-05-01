import { useEffect, useState } from "react";
import axios from "axios";
import MaterialCardItem from "./MaterialCardItem";

const StudyMaterialSection = ({ courseId, course }) => {
  const [studyTypeContent, setStudyTypeContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const MaterialList = [
    {
      name: "Notes",
      desc: "Structured chapters to read.",
      icon: "/notes.png",
      path: "/notes",
      type: "notes",
    },
    {
      name: "Flashcards",
      desc: "Quick memory boosters.",
      icon: "/flashcard.png",
      path: "/flashcards",
      type: "FlashCard",
    },
    {
      name: "Quiz",
      desc: "Test your knowledge.",
      icon: "/quiz.png",
      path: "/quiz",
      type: "Quiz",
    },
    {
      name: "QnA",
      desc: "Get answers to your doubts.",
      icon: "/qa.png",
      path: "/qa",
      type: "Qa",
    },
  ];

  useEffect(() => {
    if (courseId) fetchStudyMaterial();
  }, [courseId]);

  const fetchStudyMaterial = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await axios.post("/api/study-type", {
        courseId,
        studyType: "ALL",
      });
      setStudyTypeContent(result?.data || {});
      console.log("Result: ",result?.data);
    } catch (err) {
      setError("Failed to fetch study materials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto mt-12 px-4 md:px-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-gray-800">📚 Study Material</h2>
        <p className="text-gray-500 mt-2 text-sm">
          Choose how you want to learn. Start exploring your options below.
        </p>
      </div>

      {loading && (
        <div className="flex justify-center py-10">
          <span className="text-gray-500 text-lg">Loading...</span>
        </div>
      )}

      {error && (
        <div className="flex justify-center py-10">
          <span className="text-red-500 text-lg">{error}</span>
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
              refreshData={fetchStudyMaterial}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default StudyMaterialSection;
