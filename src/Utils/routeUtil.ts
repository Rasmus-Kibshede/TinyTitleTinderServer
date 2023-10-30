/* eslint-disable @typescript-eslint/no-unused-vars */
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

// // Validator to check uniqueness of generic type
// import { EntityTarget, FindOneOptions, ObjectLiteral } from 'typeorm';
// import { appDataSource } from '../Repositories/data-source';

// async function checkUniqueness<T extends ObjectLiteral>(entity: EntityTarget<T>, column: string, value: any): Promise<void> {
//   const repository = appDataSource.getRepository(entity);
//   const existingRecord = await repository.findOne({
//     where: {
//       [column]: value,
//     },
//   } as FindOneOptions<T>);

//   if (existingRecord) {
//     throw new Error(`The value '${value}' for '${column}' is not unique.`);
//   }
// }

// export const validateUniqueness = (entity: EntityTarget<any>, column: string) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await checkUniqueness(entity, column, req.body[column]);
//       next();
//     } catch (error) {
//       if (error instanceof Error && 'code' in error && error.code === 'ER_DUP_ENTRY') {
//         res.status(400).json({ error: 'Duplicate entry' });
//       } else {
//         res.status(400).json({ error: error.message });
//       }
//     }
//   };
// };

// eslint-disable-next-line no-unused-vars
// import { EntityTarget, FindOptionsWhere, ObjectLiteral, Repository  } from 'typeorm';

// export async function saveAndHandleDuplication<T extends ObjectLiteral>(
//   entityRepository: Repository<T>,
//   entityData: T,
//   errorMessage: string
// ): Promise<T | { err: string }> {
//   try {
//     const savedEntity = await entityRepository.save(entityData);
//     return savedEntity;
//   } catch (error) {
//     if (error instanceof Error && 'code' in error && error.code === 'ER_DUP_ENTRY') {
//       return { err: errorMessage };
//     } else {
//       return { err: 'Name not saved' };
//     }
//   }
// }

// CHECK https://medium.com/@josiahoyahaya/custom-dynamic-validators-with-typeorm-and-nestjs-2f38b0bc0919 TOMORROW