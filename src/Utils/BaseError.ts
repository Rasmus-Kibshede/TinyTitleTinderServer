type Jsonable = string | number | boolean | null | undefined | readonly Jsonable[] | { readonly [key: string]: Jsonable } | { toJSON(): Jsonable }

export class BaseError extends Error {
    public readonly statusCode?: Jsonable;
    public readonly error: Error;

    constructor(message: string, options: { error?: Error, statusCode?: Jsonable } = {}) {
        const { error, statusCode: context } = options;

        super(message);
        this.name = message;
        this.statusCode = context;

        if (error) {
            this.error = error;
        }
    }
}