/* eslint-disable @typescript-eslint/no-explicit-any */
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
    const newEmail = req.body.email;
    const password = req.body.password;

    if (validator.isEmail(newEmail) && validator.isStrongPassword(password)) {
        next();
    } else {
        res.status(400).send({ err: 'Invalid credentials' });
    }
};

export const validateNewMail = (req: Request, res: Response, next: NextFunction) => {
    const newEmail = req.body.newEmail;

    if (validator.isEmail(newEmail)) {
        next();
    } else {
        res.status(400).send({ err: 'Invalid email' });
    }
};

// Validator to check uniqueness of generic type
import { EntityTarget, FindOneOptions, ObjectLiteral } from 'typeorm';
import { appDataSource } from '../Repositories/data-source';

async function checkUniqueness<T extends ObjectLiteral>(entity: EntityTarget<T>, column: string, value: any): Promise<void> {
  const repository = appDataSource.getRepository(entity);
  const existingRecord = await repository.findOne({
    where: {
      [column]: value,
    },
  } as FindOneOptions<T>);

  if (existingRecord) {
    throw new Error(`The value '${value}' for '${column}' is not unique.`);
  }
}

export const validateUniqueness = (entity: EntityTarget<any>, column: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await checkUniqueness(entity, column, req.body[column]);
      next();
    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === 'ER_DUP_ENTRY') {
        // Handle the specific case where it's a duplicate entry error.
        res.status(400).json({ error: 'Duplicate entry' });
      } else {
        // Handle other errors.
        res.status(400).json({ error: error.message });
      }
    }
  };
};

