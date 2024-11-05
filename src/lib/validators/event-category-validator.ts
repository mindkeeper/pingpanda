import { z } from 'zod';
import { CATEGORY_NAME_VALIDATOR } from './category-validator';

export const EVENT_CATEGORY_NAME_VALIDATOR = z.object({
  name: CATEGORY_NAME_VALIDATOR,
  color: z
    .string()
    .min(1, 'Color is required')
    .regex(/^#[0-9A-F]{6}$/i, 'Color must be a valid hex color code'),
  emoji: z.string().emoji('Invalid emoji').optional(),
});

export type TEventCategoryValidator = z.infer<typeof EVENT_CATEGORY_NAME_VALIDATOR>;
