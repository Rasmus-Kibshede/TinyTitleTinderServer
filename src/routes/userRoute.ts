import { Router } from 'express';
import * as userController from '../Controllers/userController';
import { validateNewMail, validateParamsId } from '../Utils/routeUtil';
import { validateCredintials } from '../Utils/routeUtil';

const userRouter = Router();

userRouter.post('/users', validateCredintials, userController.createUser);
userRouter.post('/users/signup', userController.signUp);
userRouter.get('/users/:id', validateParamsId, userController.getUserByID);
userRouter.get('/users', userController.getAllUsers);
userRouter.put('/user', validateCredintials, validateNewMail, userController.updateUser);
userRouter.put('/users/:id', validateParamsId, userController.deleteUserByID);

export default userRouter;
