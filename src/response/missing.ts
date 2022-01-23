import { ResponseBody } from './createResponseType'
import { error } from './error'

export const missing = (message: ResponseBody | string = 'Not found.') =>
    error(404, message)
