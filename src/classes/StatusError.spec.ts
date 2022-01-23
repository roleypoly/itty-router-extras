import { StatusError } from './StatusError'

describe('class/StatusError', () => {
    describe(`StatusError(status = '500', message = 'Internal Error')`, () => {
        it('returns a JSON Response with { message } and status', async () => {
            const error = new StatusError(400, 'Bad Request')

            expect(error instanceof Error).toBe(true)
            expect(error.status).toBe(400)
            expect(error.name).toBe('StatusError')
            expect(error.message).toBe('Bad Request')
        })
    })
})
