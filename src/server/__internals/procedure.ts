/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TypedResponse, Context } from 'hono';
import { z } from 'zod';
import { Middleware, MutationOperation, QueryOperation } from './types';
import superjson from 'superjson';
import { StatusCode } from 'hono/utils/http-status';
import { Bindings } from '../env';

/**
 * Type-level SuperJSON integration
 */

declare module 'hono' {
  interface Context {
    superjson: <T>(data: T, status?: number) => SuperJSONTypedResponse<T>;
  }
}

type SuperJSONParsedType<T> = ReturnType<typeof superjson.parse<T>>;
export type SuperJSONTypedResponse<T, U extends StatusCode = StatusCode> = TypedResponse<SuperJSONParsedType<T>, U, 'json'>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export class Procedure<ctx = {}> {
  private readonly middlewares: Middleware<ctx>[] = [];

  /**
   * Optional but recomended:
   * This make "c.superjson" available in the context api routes
   */

  private superjsonMiddleware: Middleware<ctx> = async function superjsonMiddleware({ c, next }) {
    type JSONRespond = typeof c.json;

    c.superjson = (<T>(data: T, status?: StatusCode): Response => {
      const serialized = superjson.stringify(data);
      return new Response(serialized, {
        status: status || 200,
        headers: { 'Content-Type': 'application/superjson' },
      });
    }) as JSONRespond;
    return await next();
  };

  constructor(middlewares: Middleware<ctx>[] = []) {
    this.middlewares = middlewares;

    // add built-in superjson middleware if already not present

    if (!this.middlewares.some((mw) => mw.name === 'superjsonMiddleware')) {
      this.middlewares.push(this.superjsonMiddleware);
    }
  }

  use<T, Return = void>(
    fn: ({
      ctx,
      next,
      c,
    }: {
      ctx: T;
      next: <B>(args?: B) => Promise<B & T>;
      c: Context<{ Bindings: Bindings }>;
    }) => Promise<Return>
  ): Procedure<ctx & T & Return> {
    return new Procedure<ctx & T & Return>([...this.middlewares, fn as any]);
  }

  input = <Schema extends Record<string, unknown>>(schema: z.ZodSchema<Schema>) => ({
    query: <Output>(
      fn: ({
        input,
        ctx,
        c,
      }: {
        input: Schema;
        ctx: ctx;
        c: Context<{ Bindings: Bindings }>;
      }) => TypedResponse<Output> | Promise<TypedResponse<Output>>
    ): QueryOperation<Schema, Output> => ({
      type: 'query',
      schema,
      handler: fn as any,
      middlewares: this.middlewares,
    }),
    mutation: <Output>(
      fn: ({
        input,
        ctx,
        c,
      }: {
        input: Schema;
        ctx: ctx;
        c: Context<{ Bindings: Bindings }>;
      }) => TypedResponse<Output> | Promise<TypedResponse<Output>>
    ): MutationOperation<Schema, Output> => ({
      type: 'mutation',
      schema,
      handler: fn as any,
      middlewares: this.middlewares,
    }),
  });

  query<Output>(
    fn: ({
      input,
      ctx,
      c,
    }: {
      input: never;
      ctx: ctx;
      c: Context<{ Bindings: Bindings }>;
    }) => SuperJSONTypedResponse<Output> | Promise<SuperJSONTypedResponse<Output>>
  ): QueryOperation<{}, Output> {
    return {
      type: 'query',
      handler: fn as any,
      middlewares: this.middlewares,
    };
  }

  mutation<Output>(
    fn: ({
      input,
      ctx,
      c,
    }: {
      input: never;
      ctx: ctx;
      c: Context<{ Bindings: Bindings }>;
    }) => SuperJSONTypedResponse<Output> | Promise<SuperJSONTypedResponse<Output>>
  ): MutationOperation<{}, Output> {
    return {
      type: 'mutation',
      handler: fn as any,
      middlewares: this.middlewares,
    };
  }
}