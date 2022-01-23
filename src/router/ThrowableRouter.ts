import { Request, RouteHandler, Router, RouterOptions } from 'itty-router'
import { error } from '../response'

export type ThrowableRouterOptions<T> = RouterOptions<T> & { stack?: boolean }

export type RouterError = Error & {
  status?: number
}

export const ThrowableRouter = <T>(options: ThrowableRouterOptions<T> = {}) => {
  const { stack = false } = options

  return new Proxy(Router(options), {
    get:
      (obj: Router<T>, prop: string) =>
        (r: Request | string, ...args: unknown[]) => {
          if (prop === 'handle') {

            return obj.handle(r as Request, ...args).catch((err: RouterError) =>
              error(err.status || 500, {
                status: err.status || 500,
                error: err.message,
                stack: (stack && err.stack) || undefined,
              }))

          }

          return obj[prop as string](r as string, ...args as RouteHandler<Request>[])
        }
  })
}
