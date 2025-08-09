import { courseOutlineAiModel } from "@/configs/AiModel";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { inngest } from "../../../inngest/client";

export async function POST(req) {
  try {
    const { courseId, topic, courseType, difficultyLevel, createdBy } = await req.json();

    const PROMPT = `
You are an expert educator creating high-quality study material for students preparing for competitive exams.

Topic: "${topic}"
Course Type: "${courseType}"
Difficulty Level: "${difficultyLevel}"

Requirements:
1. Break the material into 5–8 logical chapters (or more if needed for topic coverage).
2. Each chapter must have:
   - "chapter_title": A short, clear title.
   - "chapter_summary": A concise 2–4 sentence summary of the chapter.
   - "topics": A list of the main subtopics.
   - "notes": Fully written study notes for this chapter, with:
     • Definitions & explanations  
     • Step-by-step examples (if applicable)  
     • Key formulas / concepts  
     • Exam tips / mnemonics  
     • Bullet points for clarity
3. Write content that is **clear, concise, and accurate**, suitable for last-minute exam revision.
4. Avoid filler text and generic instructions. Write *real, usable content*.
5. Output **only valid JSON** in the following format:

{
  "course_title": "string",
  "course_summary": "string",
  "chapters": [
    {
      "chapter_title": "string",
      "chapter_summary": "string",
      "topics": ["string", "string", ...],
      "notes": "string"
    }
  ]
}

Do not include markdown code blocks or any text outside the JSON.
`;

    const aiResponse = await courseOutlineAiModel.sendMessage(PROMPT);
    let aiText = await aiResponse.response.text();
    aiText = aiText.replace(/```json|```/g, "").trim();

    let aiResult;
    try {
      aiResult = JSON.parse(aiText);
    } catch (error) {
      console.error("AI Response Parsing Error:", aiText);
      return NextResponse.json({ error: "Invalid AI response format" }, { status: 500 });
    }

    const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
      courseId,
      courseType,
      createdBy,
      topic,
      difficultyLevel,
      courseLayout: aiResult
    }).returning({ response: STUDY_MATERIAL_TABLE });

    await inngest.send({
      name: "notes.generate",
      data: { course: dbResult[0].response }
    });

    return NextResponse.json({ result: dbResult[0] });

  } catch (error) {
    console.error("Error generating course outline:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
