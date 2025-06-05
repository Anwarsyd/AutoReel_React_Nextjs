import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './configs/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_0w8HETxLAFYB@ep-small-sunset-a8gdihf9-pooler.eastus2.azure.neon.tech/ai-short-video-generator?sslmode=require'
  },
});
