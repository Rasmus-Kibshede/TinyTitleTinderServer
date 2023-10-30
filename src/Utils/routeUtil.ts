// Middleware
import { NextFunction, Request, Response } from 'express';
import validator from 'validator';
import { NameRequestDTO } from '../DTO/nameDTO';
import { nameRepo } from '../Repositories/nameRepository';

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

export const validateDate = (req: Request, res: Response, next: NextFunction) => {
    const nameDays = req.body.namedays;

    if (Array.isArray(nameDays) && nameDays.every(date => validator.isDate(date, { format: 'DD-MM-YYYY' })) || validator.isDate(nameDays, { format: 'DD-MM-YYYY' })){
        next();
    } else {
        res.status(400).send({ err: 'Invalid date' });
    }
};

// TODO: Validation of unique name. In it's current state hangs in loading time when called in route. FIX or remove and implement generic unique validation
export const validateNameIsUniqueMiddleware = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
      const newName = req.body.newName;
      const nameRequestDTO: NameRequestDTO = {
        nameSuggestName: req.body.name,
        gender: req.body.gender,
      };
  
      const name = await nameRepo.findOneByName(nameRequestDTO.nameSuggestName);
  
      if (!name) {
        res.status(400).send({ err: 'Name not found' });
      }
  
      name!.nameSuggestName = nameRequestDTO.nameSuggestName;
  
      const nameValidation = await nameRepo.findOne({ where: { nameSuggestName: newName } });
  
      if (nameValidation) {
        res.status(400).send({ err: 'Name already exists' });
      } else {
        next();
      }
    };
  };