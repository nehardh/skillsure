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
    if (courseId) {
      fetchStudyMaterial();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  const fetchStudyMaterial = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.post("/api/study-type", {
        courseId,
        studyType: "ALL",
      });
      setStudyTypeContent(data || {});
      console.log("Fetched Study Material:", data);
    } catch (err) {
      console.error("Error fetching study materials:", err);
      setError("Failed to fetch study materials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto mt-12 px-4 md:px-8">
      {/* Section Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-gray-800">📚 Study Material</h2>
        <p className="text-gray-500 mt-2 text-sm">
          Choose how you want to learn. Start exploring your options below.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="h-48 bg-gray-200 rounded-xl shadow-sm"
            ></div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex flex-col items-center py-10 text-center">
          <p className="text-red-500 text-lg mb-3">{error}</p>
          <button
            onClick={fetchStudyMaterial}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      )}

      {/* Content Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MaterialList.map((item) => (
            <MaterialCardItem
              key={item.type}
              item={item}
              studyTypeContent={studyTypeContent}
              course={course}
              refreshData={fetchStudyMaterial}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading &&
        !error &&
        Object.keys(studyTypeContent).length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No study materials yet. Generate your first one to get started!
          </div>
        )}
    </section>
  );
};

export default StudyMaterialSection;
