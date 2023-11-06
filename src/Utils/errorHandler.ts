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

export function failed(arg: string | Error): Result<ApiResponse, BaseError> {
    if (typeof arg === 'string') {
        return customError(arg);
    } else {
        return autoError(arg);
    }
}

export const invalidIdError = (entityName: string) => {
    return new Error(`No ${entityName} with that id`);
};

function autoError(arg: Error): Result<ApiResponse, BaseError> {
    const statusCode = generateStatusCode(arg.message);
    const error = ensureError(arg);
    return {
        success: false, error: new BaseError(error.message, {
            error: error,
            statusCode: statusCode
        })
    };
}

function customError(arg: string): Result<ApiResponse, BaseError> {
    const error = invalidIdError(arg);
    return {
        success: false, error: new BaseError(error.message, {
            error: error,
            statusCode: generateStatusCode(error.message)
        })
    };
}

export const generateStatusCode = (err: string): string => {
    //Find flere errors 
    const errorMappings: Record<string, string> = {
        'ER_BAD_FIELD_ERROR': '404',
        'ER_DUP_ENTRY': '409',
    };
    if(err.includes('with that id')){
        return '404';
    }
    const statusCode = errorMappings[err] || '500';
    return statusCode;
};