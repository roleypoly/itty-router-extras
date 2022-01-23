import { RequestWithCookies } from './types'

// withCookies - embeds cookies object into the request
export const withCookies = (request: RequestWithCookies) => {
  request.cookies = {}
  try {
    request.cookies = (request.headers.get('Cookie') || '')
      .split(/;\s*/)
      .map((pair: string) => pair.split(/[=](.+)?/))
      .reduce((acc: Record<string, string>, [key, value]) => {
        acc[key] = value || ''

        return acc
      }, {})
  } catch (err) { }
}
