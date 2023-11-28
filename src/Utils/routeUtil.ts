import { NextFunction, Request, Response } from 'express';
import validator from 'validator';
import { failed } from '../Utils/errorHandler';
import { responseError } from '../Controllers/responseController';

// Middleware
export const validateParamsId = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        if (!id || isNaN(Number(id)) || Number(id) <= 0) {
            responseError(res, failed(new Error('Invalid ID')));
        } else {
            next();
        }
    } catch (error) {
        responseError(res, error);
    }
};

export const validateCredintials = (req: Request, res: Response, next: NextFunction) => {
    try {
        const newEmail = req.body.email;
        const password = req.body.password;

        if (validator.isEmail(newEmail) && validator.isStrongPassword(password)) {
            
            next();
        }
    } catch (error) {
        responseError(res, error);
    }
};

export const validateNewMail = (req: Request, res: Response, next: NextFunction) => {
    try {
        const newEmail = req.body.email;

        if (validator.isEmail(newEmail)) {
            next();
        }
    } catch (error) {
        responseError(res, error);
    }
};

export const validateDate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const nameDays = req.body.nameDays;

        if (validator.isDate(nameDays, { format: 'DD-MM-YYYY' })) {
            next();
        } else if (!nameDays) {
            next();
        }
    } catch (error) {
        responseError(res, error);
    }
};