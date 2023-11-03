type Jsonable = string | number | boolean | null | undefined | readonly Jsonable[] | { readonly [key: string]: Jsonable } | { toJSON(): Jsonable }

/*export class BaseError extends Error {
  public readonly context?: Jsonable;

  constructor(message: string, options: { error?: Error, context?: Jsonable } = {}) {
    const { error, context } = options;

    super(message, { error });
    this.name = this.constructor.name;

    this.context = context;
  }
}*/

export class BaseError extends Error {
    public readonly context?: Jsonable;
    public readonly error: Error;

    constructor(message: string, options: { error?: Error, context?: Jsonable } = {}) {
        const { error, context } = options;

        super(message);
        this.name = message;
        this.context = context;

        if (error) {
            this.error = error;
        }
    }
}