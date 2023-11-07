// Middleware
import { NextFunction, Request, Response } from 'express';
import validator from 'validator';
import { failed } from '../Utils/errorHandler';
import { responseError} from '../Controllers/responseController';

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
    const newEmail = req.body.email;
    const password = req.body.password;

    if (validator.isEmail(newEmail) && validator.isStrongPassword(password)) {
        next();
    } else {
        responseError(res, failed(new Error('Invalid credentials')));
    }
};

export const validateNewMail = (req: Request, res: Response, next: NextFunction) => {
    const newEmail = req.body.newEmail;

    if (validator.isEmail(newEmail)) {
        next();
    } else {
        responseError(res, failed(new Error('Invalid Email')));
    }
};

export const validateDate = (req: Request, res: Response, next: NextFunction) => {
    const nameDays = req.body.nameDays;

    if (validator.isDate(nameDays, { format: 'DD-MM-YYYY' })) {
        next();
    } else if (!nameDays) {
        next();
    } else {
        responseError(res, failed(new Error('Invalid date')));
    }
};