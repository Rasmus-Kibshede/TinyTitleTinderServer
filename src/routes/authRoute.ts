import { Router } from 'express';
import { login } from '../Controllers/authController';
import { validateCredintials } from '../Utils/routeUtil';
import { authorize } from '../Utils/jwtUtil';

const authRouter = Router();

authRouter.post('/login', validateCredintials, login);
authRouter.get('/checkauth', authorize);

export default authRouter;