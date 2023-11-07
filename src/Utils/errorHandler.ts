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

export function success(response: NonNullable<unknown>): Result<ApiResponse, BaseError> {
    if (Array.isArray(response)) {
        return { success: true, result: { data: response } };
    } else {
        return { success: true, result: { data: response } };
    }
}

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
    const error = ensureError(arg);
    let statusCode: string = generateStatusCode(error.message);
    if ('code' in error){
        statusCode = generateStatusCode(String(error.code));  
    }
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
            statusCode: generateStatusCode('with that id')
        })
    };
}

export const generateStatusCode = (err: string): string => {
    //Find flere errors 
    const errorMappings: Record<string, string> = {
        'with that id': '404',
        'ER_BAD_FIELD_ERROR': '404',
        'ER_DUP_ENTRY': '409',
    };
    const statusCode = errorMappings[err] || '500';
    return statusCode;
};

