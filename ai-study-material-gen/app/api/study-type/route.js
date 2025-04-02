import { CHAPTER_NOTES_TABLE } from "@/configs/schema";
import { db } from "@/configs/db";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req) {
    const { courseId, studyType } = await req.json();
    if(studyType == 'ALL') {
        const notes = await db
            .select()
            .from(CHAPTER_NOTES_TABLE)
            .where(eq(CHAPTER_NOTES_TABLE?.courseId, courseId));
        //Get all other study type records
        const result = {
            notes: notes,
            flashcard: null,
            quiz: null,
            qa: null
        }
        return NextResponse.json(result);
    } else if(studyType == 'notes') {
        const notes = await db
            .select()
            .from(CHAPTER_NOTES_TABLE)
            .where(eq(CHAPTER_NOTES_TABLE?.courseId, courseId));
        return NextResponse.json(notes);
    }
}