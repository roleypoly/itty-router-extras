import { ResponseBody } from './createResponseType'
import { json } from './json'

export const error = (
    status = 500,
    content: ResponseBody | string = 'Internal Server Error.'
) =>
    json(
        {
            ...(typeof content === 'object'
                ? content
                : {
                      status,
                      error: content,
                  }),
        },
        { status }
    )
