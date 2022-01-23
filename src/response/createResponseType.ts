export type ResponseBody = object | string | BodyInit

export const createResponseType =
    (format = 'text/plain; charset=utf-8') =>
    (body: ResponseBody, options: ResponseInit = {}) => {
        const { headers = {}, ...rest } = options

        if (typeof body === 'object') {
            return new Response(JSON.stringify(body), {
                headers: {
                    'Content-Type': format,
                    ...headers,
                },
                ...rest,
            })
        }

        return new Response(body, options)
    }
