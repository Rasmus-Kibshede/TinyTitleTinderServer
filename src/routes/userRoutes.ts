import { Router } from 'express';
import { getAllUsers, getUserByID } from '../controller/userController';
import { deleteUserByID } from '../controller/userController';

const router = Router();

router.post('users');
router.get('/users/:id', getUserByID);
router.get('/users', getAllUsers);
router.put('/users/:id', deleteUserByID);

export default router;
