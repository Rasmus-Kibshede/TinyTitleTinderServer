import { Router } from 'express';
import { checkAuth, login, logout } from '../Controllers/authController';
import { validateCredintials } from '../Utils/routeUtil';

const authRouter = Router();

authRouter.post('/login', validateCredintials, login);
authRouter.get('/checkauth', checkAuth);
authRouter.get('/logout', logout);

export default authRouter;
