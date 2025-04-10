import { courseOutlineAiModel } from "@/configs/AiModel";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { inngest } from "../../../inngest/client";

export async function POST(req) {
    try {
        const { courseId, topic, courseType, difficultyLevel, createdBy } = await req.json();

        const PROMPT = `Generate a structured study material for the topic: "${topic}" under the course type: "${courseType}" with a difficulty level of "${difficultyLevel}".`;
        const aiResponse = await courseOutlineAiModel.sendMessage(PROMPT);
        const aiText = await aiResponse.response.text();

        // 🔹 Handle potential parsing errors
        let aiResult;
        try {
            aiResult = JSON.parse(aiText);
        } catch (error) {
            console.error("AI Response Parsing Error:", error);
            return NextResponse.json({ error: "Invalid AI response format" }, { status: 500 });
        }

        // 🔹 Save AI-generated result in DB
        const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
            courseId,
            courseType,
            createdBy,
            topic,
            difficultyLevel,
            courseLayout: aiResult
        }).returning({ response: STUDY_MATERIAL_TABLE });

        //🔹 Trigger background task for generating chapter notes
        await inngest.send({
            name: 'notes.generate',
            data: { course: dbResult[0].response }
        });

        return NextResponse.json({ result: dbResult[0] });

    } catch (error) {
        console.error("Error generating course outline:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
