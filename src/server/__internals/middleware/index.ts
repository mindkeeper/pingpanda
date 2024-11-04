/**
 * Internal Middleware
 * Do not modify this file unless you know what you are doing
 */

import { MiddlewareHandler } from 'hono';
import { parseSuperJSON } from './utils';

/**
 * Middleware to parse GET-Request using superjson
 */

export const queryParsingMiddleware: MiddlewareHandler = async (c, next) => {
  const rawQuery = c.req.query();
  const parsedQuery: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(rawQuery)) {
    parsedQuery[key] = parseSuperJSON(value);
  }
  c.set('parsedQuery', parsedQuery);
  await next();
};

/**
 * Middleware to parse POST-Request using superjson
 */

export const bodyParsingMiddleware: MiddlewareHandler = async (c, next) => {
  const rawBody = c.req.json();
  const parsedBody: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(rawBody)) {
    parsedBody[key] = parseSuperJSON(value);
  }
  c.set('parsedBody', parsedBody);
  await next();
};
