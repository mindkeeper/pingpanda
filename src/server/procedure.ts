import { db } from '@/db';
import { j } from './__internals/j';
import { currentUser } from '@clerk/nextjs/server';
import { HTTPException } from 'hono/http-exception';

const authMiddleware = j.middleware(async ({ c, next }) => {
  const authHeader = c.req.header('Authorization');
  if (authHeader) {
    const apiKey = authHeader.replace('Bearer ', '');
    const user = await db.user.findUnique({
      where: { apiKey },
    });
    if (user) return next({ user });
  }

  const auth = await currentUser();
  if (!auth) throw new HTTPException(401, { message: 'Unauthorized' });
  const user = await db.user.findUnique({
    where: { id: auth.id },
  });
  if (!user) throw new HTTPException(401, { message: 'Unauthorized' });
  return next({ user });
});

/**
 * Public (unauthenticated) procedures
 * This is the base place for you use to build new queries and muttations on your API
 */

export const baseProcedures = j.procedure;
export const publicProcedures = baseProcedures;
export const privateProcedure = publicProcedures.use(authMiddleware);
