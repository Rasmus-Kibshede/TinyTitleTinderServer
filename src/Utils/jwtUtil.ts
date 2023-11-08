import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { UserResponseDTO } from '../DTO/userDTO';
//import * as responseController from '../Controllers/responseController';

//Skal denne bruge det nye Error/response system system? i så fald skal jeg lige have en gennemgang af koden. 
export const authorize = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization!.split(' ')[1];

    if (!token) {
        res.status(401).json({ auth: false, message: 'No token provided.' });
    } else {

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

            req.body.tokenlogin = decoded;

            next();
        } catch (err) {
            res.status(500).send({ err: `Invalid token: ${err.message}` });
        }
    }
};

export const authSignin = (user: UserResponseDTO, res: Response) => {
    try {
        const bearerToken = jwt.sign({ tokenlogin: user }, process.env.JWT_SECRET as string, {
            expiresIn: '1d',
        });

        res.header('Authorization', `Bearer ${bearerToken}`);

        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ err: err });
    }
};