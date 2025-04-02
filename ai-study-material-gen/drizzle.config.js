import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",  
  dbCredentials: {
    url: 'postgresql://AI-Study-Material-Gen_owner:npg_NlmQc7WEkxz4@ep-falling-hill-a5upxe45-pooler.us-east-2.aws.neon.tech/AI-Study-Material-Gen?sslmode=require',
  },
});
