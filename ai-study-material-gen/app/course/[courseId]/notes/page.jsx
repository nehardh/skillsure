"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import DOMPurify from "dompurify";
import { marked } from "marked";

function ViewNotes() {
    const { courseId } = useParams();
    const router = useRouter();

    const [notes, setNotes] = useState([]);
    const [currentChapter, setCurrentChapter] = useState(0);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await axios.post("/api/study-type", {
                courseId,
                studyType: "notes",
            });
            setNotes(Array.isArray(response?.data) ? response.data : []);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    const handleNextChapter = () => {
        if (currentChapter < notes.length - 1) {
            setCurrentChapter((prev) => prev + 1);
        }
    };

    const handlePrevChapter = () => {
        if (currentChapter > 0) {
            setCurrentChapter((prev) => prev - 1);
        }
    };

    const goBackToCourse = () => {
        router.push(`/course/${courseId}`);
    };

    return notes.length > 0 ? (
        <div className="px-6 py-8 max-w-4xl mx-auto">
            {/* Navigation */}
            <div className="flex items-center justify-between gap-4 mb-6">
                {currentChapter > 0 ? (
                    <Button variant="secondary" onClick={handlePrevChapter}>
                        ← Previous
                    </Button>
                ) : (
                    <Button variant="ghost" onClick={goBackToCourse}>
                        ← Back to Course
                    </Button>
                )}

                <div className="flex-1 flex gap-2 mx-4">
                    {notes.map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 flex-1 rounded-full transition-colors ${
                                index <= currentChapter ? "bg-primary" : "bg-gray-200"
                            }`}
                        />
                    ))}
                </div>

                {currentChapter < notes.length - 1 && (
                    <Button variant="secondary" onClick={handleNextChapter}>
                        Next →
                    </Button>
                )}
            </div>

            {/* Notes Content */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                {notes[currentChapter]?.chapter_title && (
                    <h2 className="text-2xl font-bold mb-3 text-primary">
                        Chapter {currentChapter + 1}: {notes[currentChapter].chapter_title}
                    </h2>
                )}

                {notes[currentChapter]?.chapter_summary && (
                    <p className="text-gray-600 mb-5 leading-relaxed">
                        {notes[currentChapter].chapter_summary}
                    </p>
                )}

                {notes[currentChapter]?.topics?.length > 0 && (
                    <div className="mb-4">
                        <h3 className="font-semibold text-gray-700 mb-2">Topics Covered:</h3>
                        <ul className="list-disc list-inside text-gray-800 space-y-1">
                            {notes[currentChapter].topics.map((topic, index) => (
                                <li key={index}>{topic}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {notes[currentChapter]?.notes ? (
                    <div className="mt-6 pt-4 border-t">
                        <div
                            className="prose max-w-none prose-blue"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                    marked.parse(notes[currentChapter].notes)
                                ),
                            }}
                        />
                    </div>
                ) : (
                    <p className="text-gray-500 italic">No content available for this chapter.</p>
                )}
            </div>
        </div>
    ) : (
        <p className="text-center text-gray-500 mt-20 text-lg">Loading notes...</p>
    );
}

export default ViewNotes;
