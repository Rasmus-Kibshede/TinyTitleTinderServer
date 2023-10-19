import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { UserResponseDTO } from '../DTO/userDTO';

export const authorize = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization!.split(' ')[1];

    if (!token) {
        return res.status(401).json({ auth: false, message: 'No token provided.' });
    } else {

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

            console.log(decoded);

            req.body.user = decoded;

            next();
        } catch (err) {
            res.status(500).send({ err: `Invalid token: ${err}` });
        }

    }
};

export const authSignin = (user: UserResponseDTO, res: Response) => {
    try {
        const bearerToken = jwt.sign({ id: user }, process.env.JWT_SECRET as string, {
            expiresIn: '1d',
        });

        res.header('Authorization', `Bearer ${bearerToken}`);

        res.status(200).send({ user });
    } catch (err) {
        res.status(500).send({ err: err });
    }
};