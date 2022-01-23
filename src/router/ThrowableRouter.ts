import { Request, RouteHandler, Router, RouterOptions } from 'itty-router'
import { StatusError } from '../classes'
import { error } from '../response'

export type ThrowableRouterOptions<T> = RouterOptions<T> & { stack?: boolean }

export const ThrowableRouter = <T>(options: ThrowableRouterOptions<T> = {}) => {
  const { stack = false } = options

  return new Proxy(Router(options), {
    get:
      (obj: Router<T>, prop: string) =>
        (r: Request | string, ...args: unknown[]) => {
          if (prop === 'handle') {
            return obj.handle(r as Request, ...args).catch((err: StatusError | Error) => {
              const status = err instanceof StatusError
                ? err.status || 500
                : 500

              return error(status, {
                status,
                error: err.message,
                stack: (stack && err.stack) || undefined,
              })
            })
          }

          return obj[prop as string](r as string, ...args as RouteHandler<Request>[])
        }
  })
}
