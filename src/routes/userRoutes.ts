import { Router } from 'express';
import { getAllUsers, getUserByID } from '../controller/userController';

const router = Router();

router.get('/users/:id', getUserByID);
router.get('/users', getAllUsers);

export default router;
