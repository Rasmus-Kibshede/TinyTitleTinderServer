// Middleware
import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

// Middleware
export const validateParamsId = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).send({ err: 'Invalid ID' });
    } else if (isNaN(Number(id))) {
        res.status(406).send({ err: 'Not Acceptable' });
    }

    next();
};

export const validateCredintials = (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const password = req.body.password;

    if (validator.isEmail(email) && validator.isStrongPassword(password)) {
        next();
    } else {
        res.status(400).send({ err: 'Invalid credentials' });
    }
};