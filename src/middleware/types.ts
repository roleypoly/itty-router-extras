import { Request as IttyRequest } from 'itty-router'

export type RequestWithContent<T> = Request &
    IttyRequest & {
        content: T | undefined
    }
export type RequestWithCookies = Request &
    IttyRequest & {
        cookies: { [key: string]: string }
    }
export type RequestWithParams = Request & IttyRequest & Record<string, string>

export type RequestWithMiddleware<T> = RequestWithContent<T> &
    RequestWithCookies &
    RequestWithParams
