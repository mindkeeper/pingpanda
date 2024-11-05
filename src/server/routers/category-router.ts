import { startOfMonth } from 'date-fns';
import { z } from 'zod';
import { router } from '../__internals/router';
import { privateProcedure } from '../procedure';
import { db } from '@/db';

export const dynamic = 'force-dynamic';

export const categoryRouter = router({
  getEventCategories: privateProcedure.query(async ({ c, ctx }) => {
    const categories = await db.eventCategory.findMany({
      where: {
        userId: ctx.user.id,
      },
      select: {
        id: true,
        name: true,
        emoji: true,
        color: true,
        updatedAt: true,
        createdAt: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const now = new Date();
        const firstDayOfMonth = startOfMonth(now);

        const [uniqueFieldCount, eventsCount, lastPing] = await Promise.all([
          getUniqueFieldNames(category.id, firstDayOfMonth),
          db.event.count({
            where: {
              EventCategory: { id: category.id },
              createdAt: { gte: firstDayOfMonth },
            },
          }),
          db.event.findFirst({
            where: {
              EventCategory: { id: category.id },
            },
            orderBy: {
              createdAt: 'desc',
            },
            select: {
              createdAt: true,
            },
          }),
        ]);
        return {
          ...category,
          uniqueFieldCount,
          eventsCount,
          lastPing: lastPing?.createdAt || null,
        };
      })
    );
    return c.superjson({ categories: categoriesWithCount });
  }),
  deleteCategory: privateProcedure.input(z.object({ name: z.string() })).mutation(async ({ c, input, ctx }) => {
    const { name } = input;
    console.log('name', name);
    await db.eventCategory.delete({
      where: { name_userId: { name, userId: ctx.user.id } },
    });

    return c.json({ success: true });
  }),
});

async function getUniqueFieldNames(categoryId: string, firstDayOfMonth: Date) {
  const events = await db.event.findMany({
    where: {
      EventCategory: { id: categoryId },
      createdAt: { gte: firstDayOfMonth },
    },
    select: {
      fields: true,
    },
    distinct: ['fields'],
  });

  // creating a set directly for unique field names without further checks
  const fieldNames = new Set<string>();

  // iterate through each distince event fields
  for (const event of events) {
    // iterate through each field name
    for (const fieldName of Object.keys(event.fields as object)) {
      // add field name to the set
      fieldNames.add(fieldName);
    }
  }
  return fieldNames.size;
}
