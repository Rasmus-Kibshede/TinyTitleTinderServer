import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { UserResponseDTO } from '../DTO/userDTO';

//Skal denne bruge det nye Error/response system system? i så fald skal jeg lige have en gennemgang af koden.
export const authorizeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const decoded = jwt.verify(getBaererToken(req), checkJwtSecret());
    req.body.tokenlogin = decoded;
    next();
  } catch (err) {
    res.status(500).send({ err: `Invalid token: ${err.message}` });
  }
};

export const ValidateAuth = (req: Request) => {
  try {
    const decoded = jwt.verify(getBaererToken(req), checkJwtSecret());
    return !!decoded;
  } catch (err) {
    throw new Error(`Invalid token: ${err.message}`);
  }
};

export const authSignin = (user: UserResponseDTO, res: Response) => {
  try {
    const bearerToken = jwt.sign({ tokenlogin: user }, checkJwtSecret(), {
      expiresIn: '1d',
    });

    res.header('Authorization', `Bearer ${bearerToken}`);

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ err: err });
  }
};

const checkJwtSecret = () => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) throw new Error('JWT_SECRET not set');
  return jwtSecret;
};

const getBaererToken = (req: Request) => {
  if (
    req.headers.authorization === undefined ||
    !req.headers.authorization.includes('Bearer')
  ) {
    throw new Error('No token provided.');
  }
  const bearerToken = req.headers.authorization!.split(' ')[1];
  return bearerToken;
};
