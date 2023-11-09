import { Router } from 'express';
import * as userControllerMDB from '../Controllers/userControllerMDB';
import { validateCredintials, validateParamsEmail } from '../Utils/routeUtil';

const userRouterMDB = Router();

userRouterMDB.post('/usersmongo', validateCredintials, userControllerMDB.createUser);
userRouterMDB.get('/usersmongo', userControllerMDB.getAllUsers);
userRouterMDB.get('/usersmongo/:email', validateParamsEmail, userControllerMDB.getUserByEmail);
userRouterMDB.put('/usersmongo', validateCredintials, userControllerMDB.updateUser);
userRouterMDB.put('/usersmongo/:email', validateParamsEmail, userControllerMDB.deleteUserByEmail);

export default userRouterMDB;