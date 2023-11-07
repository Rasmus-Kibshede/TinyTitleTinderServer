import { Router } from 'express';
import { createUser } from '../Services/userServiceMDB';

const userRouterMDB = Router();

userRouterMDB.post('/usersmongo', createUser);

export default userRouterMDB;