import { Router } from 'express';
import { checkAuth, login } from '../Controllers/authController';
import { validateCredintials } from '../Utils/routeUtil';

const authRouter = Router();

authRouter.post('/login', validateCredintials, login);
authRouter.get('/checkauth', checkAuth);

export default authRouter;
