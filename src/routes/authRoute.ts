import { Router } from 'express';
import { login } from '../Controllers/authController';
import { validateCredintials } from './routeUtils';

const authRouter = Router();

authRouter.post('/login', validateCredintials, login);


export default authRouter;