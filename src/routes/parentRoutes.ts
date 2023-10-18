import { NextFunction, Router, Request, Response } from 'express';
import { createUser, getUserByID, getAllUsers, updateUser, deleteUserByID } from '../Controllers/userController';
import validator from 'validator';

const router = Router();

// Middleware
const validateId = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).send({ err: 'Invalid ID' });
    } else if (isNaN(Number(id))) {
        res.status(406).send({ err: 'Not Acceptable' });
    }

    next();
};

const validateCredintials = (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const password = req.body.password;

    if (validator.isEmail(email) && validator.isStrongPassword(password)) {
        next();
    } else {
        res.status(400).send({ err: 'Invalid credentials' });
    }
};

router.post('/parents', validateCredintials, createParent);
router.get('/parents/:id', validateId, getParentByID);
router.get('/parents', getAllParents);
router.put('/parents', validateCredintials, updateParent);
router.put('/parents/:id', validateId, deleteParentByID);

export default router;
