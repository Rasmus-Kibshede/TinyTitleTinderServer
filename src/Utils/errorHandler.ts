import { BaseError } from './BaseError';

export type Result<T, E extends BaseError = BaseError> = { success: true, result: T } | { success: false, error: E }
export type ApiResponse = { data: NonNullable<unknown> }

export const ensureError = (value: unknown): Error => {
    if (value instanceof Error) return value;

    let stringified = '[Unable to stringify the thrown value]';
    try {
        stringified = JSON.stringify(value);
    } catch { /* empty */ }

    const error = new Error(`This value was thrown as is, not through an Error: ${stringified}`);
    return error;
};

export function failed(err: Error, statusCode: string): Result<ApiResponse, BaseError> {
    const error = ensureError(err);
    return {
        success: false, error: new BaseError(error.message, {
            error: error,
            statusCode: statusCode
        })
    };
}

export const errors = async (err: string) => {
    const errors = [
        {
            message: 'ER_DUP_ENTRY',
            statusCode: 400
        },
        {
            message: 'ER_DUP_ENTRY',
            statusCode: 401
        },
        {
            message: 'ER_DUP_ENTRY',
            statusCode: 403
        },{
            message: 'ER_BAD_FIELD_ERROR',
            statusCode: 404
        }, 
        {
            message: 'ER_DUP_ENTRY',
            statusCode: 409
        },
        {
            message: 'ER_DUP_ENTRY',
            statusCode: 500
        },
    ];

const errTest = err;
console.log(errTest);


    return errors;
    };
    
