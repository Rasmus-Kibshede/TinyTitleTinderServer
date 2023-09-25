import { Router } from 'express';
import { getUserByID } from '../controller/userController';

const router = Router();

router.get('/users/:id', getUserByID);

export default router;
