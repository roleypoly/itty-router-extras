jest.unmock('itty-router')
import 'isomorphic-fetch'
import { ThrowableRouter } from './ThrowableRouter'

describe('router/ThrowableRouter', () => {
    describe(`ThrowableRouter(options = {})`, () => {
        it('is an itty proxy', async () => {
            const router = ThrowableRouter()

            router.get('/hello', () => new Response('hello world'))
            expect(router.routes.length).toBe(1)

            const response = await router.handle(new Request('https://slick.local/hello'))

            expect(response.status).toBe(200)
            expect(await response.text()).toBe('hello world')
        })

        it('captures a throw', async () => {
            const router = ThrowableRouter()

            router.get('/breaks', () => {
                throw new Error('throw')
            })

            const response = await router.handle(new Request('https://slick.local/breaks'))

            expect(response.status).toBe(500)

            const payload = await response.json()

            expect(payload.error).not.toBeUndefined()
            expect(payload.status).toBe(500)
        })

        it('includes a stack trace with option', async () => {
            const router = ThrowableRouter({ stack: true })

            router.get('/breaks', () => {
                throw new Error('throw')
            })

            const response = await router.handle(new Request('https://slick.local/breaks'))
            const payload = await response.json()

            expect(response.status).toBe(500)
            expect(payload.error).not.toBeUndefined()
            expect(payload.stack).not.toBeUndefined()
            expect(payload.status).toBe(500)
        })
    })
})
