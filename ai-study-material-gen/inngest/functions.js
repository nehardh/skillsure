import { generateNotesAiModel, generateQuizAiModel, generateStudyTypeContentAiModel } from "@/configs/AiModel";
import { inngest } from "./client";
import { db } from '@/configs/db';
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE, USER_TABLE } from '@/configs/schema';
import { eq } from 'drizzle-orm';

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const CreateNewUser = inngest.createFunction(
    { id: "create-user" },
    { event: "user.create" },
    async ({ event, step }) => {
        const { user } = event.data;
        const result = await step.run('Check User and Create New If Not In Database', async () => {
            //Check if user exists
            const result = await db
                .select()
                .from(USER_TABLE)
                .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));
            console.log(result);
            if(result?.length == 0) {
                //If not, add to the database
                const userResp = await db.insert(USER_TABLE).values({
                    name: user?.fullName,
                    email: user?.primaryEmailAddress?.emailAddress,
                }).returning({ id: USER_TABLE.id });
                return userResp;
            }
            return result;
        })
        return 'Success';
    }

    //TODO: Push notifications-Email

    //TODO: Push Notification after 3 days of user login
);

export const GenerateNotes = inngest.createFunction(
    { id: 'generate-course' },
    { event: 'notes.generate' },
    async ({ event, step }) => {
        const { course } = event.data;

        //Generate notes for each chapter with AI
        const notesResult = await step.run('Generate Chapter Notes', async () => {
            const Chapters = course?.courseLayout?.chapters;
            let index = 0;
            Chapters.forEach( async (chapter) => {
                const PROMPT = 'Generate exam material detail content for each chapter , Make sure to includes all topic point in the content, make sure to give content in HTML format (Do not Add HTMLK , Head, Body, title tag), The chapters:'+JSON.stringify(chapter);
                const result = await generateNotesAiModel.sendMessage(PROMPT);
                const aiResponse = result.response.text();

                await db.insert(CHAPTER_NOTES_TABLE).values({
                    chapterId: index,
                    courseId: course?.courseId,
                    notes: aiResponse,
                });
                index = index + 1;
            })
            return 'Completed';
        });

        //Update status to 'Ready'
        const updateCourseStatusResult = await step.run('Update course status to ready', async () => {
            const result = await db.update(STUDY_MATERIAL_TABLE).set({
                status: 'Ready'
            }).where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId));
            return 'Success';
        })
    }
);

//Generates Flashcards, Quizzes, QnA
export const GenerateStudyTypeContent = inngest.createFunction(
   { id: 'Generate Study Type Content'},
   { event: 'studyType.content'},
   async ({ event, step }) => {
        const { studyType, prompt, courseId, recordId } = event.data;
        const AiResult = await step.run('Generating flashcards using gemini ai', async () => {
            const result =
            studyType == 'Flashcards' ? 
                await generateStudyTypeContentAiModel.sendMessage(prompt) :
                await generateQuizAiModel.sendMessage(prompt);
            const AIResult = JSON.parse(result.response.text());
            return AIResult
        });

        //Save the result
        const DBresult = await step.run('Save result to DB', async () => {
            const result = await db.update(STUDY_TYPE_CONTENT_TABLE)
                .set({
                    content: AiResult,
                    status: 'Ready'
                }).where(eq(STUDY_TYPE_CONTENT_TABLE.id, recordId))
                return "Data Inserted"
        })
   }
);