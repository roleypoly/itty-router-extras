export const text = (message: BodyInit, options: ResponseInit = {}) =>
    new Response(message, options)
