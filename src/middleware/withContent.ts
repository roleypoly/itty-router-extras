import { RequestWithContent } from './types'

// withContent - embeds any request body as request.content
export const withContent = async <T>(request: RequestWithContent<T>) => {
    let contentType = request.headers.get('content-type')
    request.content = undefined

    try {
        if (contentType) {
            if (contentType.includes('application/json')) {
                request.content = await request.json()
            }
        }
    } catch (err) {} // silently fail on error
}
