import { db } from "@/configs/db";
import { STUDY_TYPE_CONTENT_TABLE  } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { chapters, courseId, type } = await req.json();

    const PROMPT =
    type == 'Flashcard' ? 
        'Generate flashcards on the topic: '+chapters+' in json format with front and back content. It can have a maximum of 20 cards':
        'Generate Quiz on the topic: '+chapters+' along with correct answers in json format.';

    //Insert record to DB, update the status to generating
    const result = await db.insert(STUDY_TYPE_CONTENT_TABLE)
        .values({
            courseId: courseId,
            type: type,
        }).returning({ id: STUDY_TYPE_CONTENT_TABLE.id });

    //Trigger Inngest function
    inngest.send({
        name: 'studyType.content',
        data: {
            studyType: type,
            prompt: PROMPT,
            courseId: courseId,
            recordId: result[0].id
        }
    });
    return NextResponse.json( result[0].id );
}