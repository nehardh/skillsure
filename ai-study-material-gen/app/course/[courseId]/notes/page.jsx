"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

function ViewNotes() {
    const { courseId } = useParams();
    const [notes, setNotes] = useState([]);
    const [chapterIndex, setChapterIndex] = useState(0);

    useEffect(() => {
        GetNotes();
    }, []);

    const GetNotes = async () => {
        try {
            const result = await axios.post("/api/study-type", {
                courseId: courseId,
                studyType: "notes",
            });
            console.log(result?.data);
            
            // Ensure proper formatting
            const parsedNotes = Array.isArray(result?.data) ? result.data : [];
            setNotes(parsedNotes);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    const nextChapter = () => {
        if (chapterIndex < notes.length - 1) {
            setChapterIndex(chapterIndex + 1);
        }
    };

    const prevChapter = () => {
        if (chapterIndex > 0) {
            setChapterIndex(chapterIndex - 1);
        }
    };

    return notes.length > 0 ? (
        <div className="px-4">
            {/* Progress Bar */}
            <div className="flex gap-5 items-center mt-8">
                {chapterIndex > 0 && (
                    <Button variant="outline" size="sm" onClick={prevChapter}>
                        Previous
                    </Button>
                )}
                {notes.map((_, index) => (
                    <div key={index} className={`w-full h-2 rounded-full ${index <= chapterIndex ? 'bg-primary' : 'bg-gray-200'}`} />
                ))}
                {chapterIndex < notes.length - 1 && (
                    <Button variant="outline" size="sm" onClick={nextChapter}>
                        Next
                    </Button>
                )}
            </div>

            {/* Notes Content */}
            <div className="mt-10 p-5 border border-gray-300 rounded-lg shadow-md bg-white">
                <h2 className="text-xl font-semibold mb-3">
                    Chapter {chapterIndex + 1}: {notes[chapterIndex]?.chapter_title || "Untitled"}
                </h2>

                {/* Render chapter summary */}
                {notes[chapterIndex]?.chapter_summary && (
                    <p className="text-gray-600 mb-4">{notes[chapterIndex].chapter_summary}</p>
                )}

                {/* Render topic list */}
                {notes[chapterIndex]?.topics && notes[chapterIndex]?.topics.length > 0 && (
                    <ul className="list-disc list-inside mt-3 text-gray-700">
                        {notes[chapterIndex].topics.map((topic, index) => (
                            <li key={index}>{topic}</li>
                        ))}
                    </ul>
                )}

                {/* Render the actual notes (HTML content) */}
                {notes[chapterIndex]?.notes && (
                    <div className="mt-4 border-t pt-3">
                        <div
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: notes[chapterIndex].notes.replace(/```html/g, ""),
                            }}
                        />
                    </div>
                )}

                {/* If no content, show a message */}
                {!notes[chapterIndex]?.notes && (
                    <p className="text-gray-500">No content available for this chapter.</p>
                )}
            </div>
        </div>
    ) : (
        <p className="text-gray-500 text-center mt-10">Loading notes...</p>
    );
}

export default ViewNotes;
