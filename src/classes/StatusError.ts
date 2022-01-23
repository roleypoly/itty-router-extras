export class StatusError extends Error {
    public name = 'StatusError'

    constructor(public status = 500, public message = 'Internal Error.') {
        super(message)
    }
}
