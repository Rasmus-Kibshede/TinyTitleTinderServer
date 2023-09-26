import { Router } from 'express';
import { createUser, getAllUsers, getUserByID, deleteUserByID, updateUser } from '../controller/userController';
import { } from '../controller/userController';

const router = Router();

router.post('/users', createUser);
router.get('/users/:id', getUserByID);
router.get('/users', getAllUsers);
router.put('/users', updateUser);
router.put('/users/:id', deleteUserByID);

export default router;
