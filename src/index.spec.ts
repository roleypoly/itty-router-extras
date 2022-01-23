import * as indexExports from './index'
describe('itty-router-extras', () => {
    it('returns all exports', async () => {
        const expectedExports = [
            'StatusError',
            'withContent',
            'withCookies',
            'withParams',
            'error',
            'json',
            'missing',
            'status',
            'text',
            'ThrowableRouter',
        ]

        for (const e of expectedExports) {
            if (!indexExports[e as keyof typeof indexExports]) {
                console.log('missing export:', e)
            }
            expect(Boolean(indexExports[e as keyof typeof indexExports])).toBeTruthy()
        }
    })
})
