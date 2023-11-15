import { Router } from 'express';
import { checkAuth, login, logout } from '../Controllers/authController';
import { validateCredintials } from '../Utils/routeUtil';
import { authorizeToken, cookieChecker } from '../Utils/jwtUtil';

const authRouter = Router();

authRouter.post('/login', validateCredintials, login);
authRouter.get('/checkauth', cookieChecker, authorizeToken, checkAuth);
authRouter.get('/logout', cookieChecker, logout);

export default authRouter;
