import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { failed } from '../Utils/errorHandler';
import { responseError } from '../Controllers/responseController';
import { ParentResponseDTO } from '../DTO/parentDTO';

//Skal denne bruge det nye Error/response system system? i så fald skal jeg lige have en gennemgang af koden.
export const authorizeToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const decoded = jwt.verify(getToken(req), checkJwtSecret());
    req.body.tokenlogin = decoded;

    next();
  } catch (err) {
    throw new Error(`Invalid token: ${err.message}`);
  }
};

export const ValidateAuth = (req: Request) => {
  try {
    const decoded = jwt.verify(getToken(req), checkJwtSecret());
    return !!decoded;
  } catch (err) {
    throw new Error(`Invalid token: ${err.message}`);
  }
};

export const authSignin = (parent: ParentResponseDTO, res: Response) => {
  try {
    const token = jwt.sign({ tokenlogin: parent }, checkJwtSecret(), {
      expiresIn: '1d',
    });

    res.header('Authorization', `Bearer ${token}`);

    // const dayInmilisecunds = 86400000;

    // res.cookie('jwt', token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV !== 'development',
    //   sameSite: 'strict',
    //   maxAge: dayInmilisecunds,
    // });

    return token;
  } catch (err) {
    failed(err);
  }
};

export const clearToken = (res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  return true;
};

const checkJwtSecret = () => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) throw new Error('JWT_SECRET not set');
  return jwtSecret;
};

const getToken = (req: Request) => {
  if (
    req.headers.authorization === undefined ||
    !req.headers.authorization.includes('Bearer')
  ) {
    throw new Error('No token provided.');
  }
  const token = req.headers.authorization!.split(' ')[1];
  return token;
};

// export const cookieChecker = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (req.cookies.jwt === undefined) {
//     responseError(res, failed(new Error('No token provided.')));
//   } else {
//     next();
//   }
// };
