import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { handle } from 'hono/vercel';

// nextjs handler
const app = new Hono().basePath('/api').use(cors());

export const httpHandler = handle(app);
