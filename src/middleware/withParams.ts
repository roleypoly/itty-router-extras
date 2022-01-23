// withParams - injects route params within request at top level
// const { retrieve } = require('../utils/retrieve')

import { RequestWithParams } from './types'

// const withParams = retrieve(v => true, (prop, request) => request.params && request.params[prop]
//                                                           ? request.params[prop]
//                                                           : request[prop])

export const withParams = (request: RequestWithParams) => {
    if (request.params) {
        for (const param in request.params) {
            request[param] = request.params[param]
        }
    }
}
