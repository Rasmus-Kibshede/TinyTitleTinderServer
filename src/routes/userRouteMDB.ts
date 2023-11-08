import { Router } from 'express';
import { createUser, deleteUserByEmail, getAllUsers, getUserByEmail, updateUser } from '../Controllers/userControllerMDB';

const userRouterMDB = Router();

userRouterMDB.post('/usersmongo', createUser);
userRouterMDB.get('/usersmongo', getAllUsers);
userRouterMDB.get('/usersmongo/:id', getUserByEmail);
userRouterMDB.put('/usersmongo', updateUser);
userRouterMDB.put('/usersmongo/:id', deleteUserByEmail);

export default userRouterMDB;