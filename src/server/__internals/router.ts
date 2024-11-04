/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context, Hono, MiddlewareHandler, Next } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { Bindings } from '../env';
import { MutationOperation, QueryOperation } from './types';
import { queryParsingMiddleware } from './middleware';
import { ZodError } from 'zod';
import { Variables } from 'hono/types';
import { StatusCode } from 'hono/utils/http-status';

type OperationType<I extends Record<string, unknown>, O> = QueryOperation<I, O> | MutationOperation<I, O>;

export const router = <T extends Record<string, OperationType<any, any>>>(obj: T) => {
  const route = new Hono<{ Bindings: Bindings; Variables: any }>().onError((err, c) => {
    if (err instanceof HTTPException) {
      return c.json(
        {
          error: 'Server Error',
          message: err.message,
          type: 'HTTPException',
        },
        err.status
      );
    } else {
      return c.json(
        {
          error: 'Unknown Error',
          message: 'An unexpected error occurred',
          type: 'UnknownError',
        },
        500
      );
    }
  });

  for (const [key, operation] of Object.entries(obj)) {
    const path = `/${key}` as const;

    const operationalMiddlewares: MiddlewareHandler[] = operation.middlewares.map((middleware) => {
      const wrapperFunction = async (c: Context, next: Next) => {
        const ctx = c.get('__middleware_output') ?? {};

        const nextWrapper = <B>(args: B) => {
          c.set('__middleware_output', { ...ctx, ...args });
          return { ...ctx, ...args };
        };
        const res = await middleware({ ctx, next: nextWrapper, c });
        c.set('__middleware_output', { ...ctx, ...res });
        await next();
      };
      return wrapperFunction;
    });

    if (operation.type === 'query') {
      if (operation.schema) {
        route.get(path, queryParsingMiddleware, ...operationalMiddlewares, (c) => {
          const ctx = c.get('__middleware_output') || {};
          const parsedQuery = c.get('parsedQuery');

          let input;
          try {
            input = operation.schema?.parse(parsedQuery);
          } catch (err) {
            if (err instanceof ZodError) {
              throw new HTTPException(400, {
                cause: err,
                message: err.message,
              });
            } else {
              throw err;
            }
          }
          return operation.handler({ ctx, c, input });
        });
      } else {
        route.get(path, ...operationalMiddlewares, (c) => {
          const ctx = c.get('__middleware_output') || {};
          return operation.handler({ ctx, c, input: undefined });
        });
      }
    } else if (operation.type === 'mutation') {
      if (operation.schema) {
        route.post(path, queryParsingMiddleware, ...operationalMiddlewares, (c) => {
          const ctx = c.get('__middleware_output') || {};
          const parsedBody = c.get('parsedBody');
          let input;
          try {
            input = operation.schema?.parse(parsedBody);
          } catch (err) {
            if (err instanceof ZodError) {
              throw new HTTPException(400, {
                cause: err,
                message: err.message,
              });
            } else {
              throw err;
            }
          }
          return operation.handler({ ctx, c, input });
        });
      } else {
        route.post(path, ...operationalMiddlewares, (c) => {
          const ctx = c.get('__middleware_output') || {};
          return operation.handler({ ctx, c, input: undefined });
        });
      }
    }
  }

  type InferInput<T> = T extends OperationType<infer I, any> ? I : {};
  type InferOutput<T> = T extends OperationType<any, infer O> ? O : {};

  return route as Hono<
    { Bindings: Bindings; Variables: Variables },
    {
      [K in keyof T]: T[K] extends QueryOperation<any, any>
        ? {
            $get: {
              input: InferInput<T[K]>;
              output: InferOutput<T[K]>;
              outputFormat: 'json';
              status: 200;
            };
          }
        : {
            $post: {
              input: InferInput<T[K]>;
              output: InferOutput<T[K]>;
              outputFormat: 'json';
              status: StatusCode;
            };
          };
    }
  >;
};
