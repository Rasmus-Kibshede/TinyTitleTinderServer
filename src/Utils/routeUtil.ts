// Middleware
import { NextFunction, Request, Response } from 'express';
import validator from 'validator';
import { failed } from '../Utils/errorHandler';

// Middleware
export const validateParamsId = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (!id) {
        failed(new Error('Invalid ID'));
    } else if (isNaN(Number(id))) {
        failed('Not Acceptable');
    }
    next();
};

export const validateCredintials = (req: Request, res: Response, next: NextFunction) => {
    const newEmail = req.body.email;
    const password = req.body.password;

    if (validator.isEmail(newEmail) && validator.isStrongPassword(password)) {
        next();
    } else {
        failed(new Error('Invalid credentials'));
    }
};

export const validateNewMail = (req: Request, res: Response, next: NextFunction) => {
    const newEmail = req.body.newEmail;

    if (validator.isEmail(newEmail)) {
        next();
    } else {
        failed(new Error('Invalid Email'));
    }
};

export const validateDate = (req: Request, res: Response, next: NextFunction) => {
    const nameDays = req.body.nameDays;

    if (validator.isDate(nameDays, { format: 'DD-MM-YYYY' })){
        next();
    } else if (!nameDays) {
        next();
    } else {
        failed(new Error('Invalid datel'));
    }
};