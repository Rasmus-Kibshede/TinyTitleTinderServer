import { BaseError } from '../Utils/BaseError';
import { Result, ApiResponse } from '../Utils/errorHandler';
import { Response } from 'express';

export const response = (res: Response<unknown, Record<string, unknown>>, response: Result<ApiResponse, BaseError>, statusCodeSuccess: number) => {
    res.status(response.success ? statusCodeSuccess : Number(response.error.statusCode)).send(response.success ? { success: response.success, data: response.result.data } : { success: response.success, message: response.error.message });
};