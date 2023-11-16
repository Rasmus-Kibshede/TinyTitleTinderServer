import { Router } from 'express';
import { checkAuth, login, logout } from '../Controllers/authController';
import { validateCredintials } from '../Utils/routeUtil';
import { authorizeToken } from '../Utils/jwtUtil';

const authRouter = Router();

authRouter.post('/login', validateCredintials, login);
authRouter.get('/checkauth', authorizeToken, checkAuth);
authRouter.get('/logout', logout);

export default authRouter;
