import { Router } from 'express';
import { validateParamsId } from '../Utils/routeUtil';
import * as roleController from '../Controllers/roleController';

const userRouter = Router();

userRouter.post('/roles', roleController.createRole);
userRouter.get('/roles/:id', validateParamsId, roleController.getRoleByID);
userRouter.get('/roles', roleController.getAllRoles);
userRouter.put('/roles', roleController.updateRole);
userRouter.put('/roles/:id', validateParamsId, roleController.deleteRoleByID);

export default userRouter;