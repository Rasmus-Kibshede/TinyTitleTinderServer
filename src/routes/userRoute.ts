import { Router } from 'express';
import { createUser, getUserByID, getAllUsers, updateUser, deleteUserByID } from '../Controllers/userController';
import { validateNewMail, validateParamsId } from '../Utils/routeUtil';
import { validateCredintials } from '../Utils/routeUtil';

const userRouter = Router();

userRouter.post('/users', validateCredintials, createUser);
userRouter.get('/users/:id', validateParamsId, getUserByID);
userRouter.get('/users', getAllUsers);
userRouter.put('/user', validateCredintials, validateNewMail, updateUser);
userRouter.put('/users/:id', validateParamsId, deleteUserByID);

export default userRouter;
