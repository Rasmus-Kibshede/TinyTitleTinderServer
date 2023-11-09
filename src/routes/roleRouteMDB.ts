import { Router } from 'express';
import { validateParamsObjectId } from '../Utils/routeUtil';
import * as roleControllerMDB from '../Controllers/roleControllerMDB';

const userRouter = Router();

userRouter.post('/rolesmongo', roleControllerMDB.createRole);
userRouter.get('/rolesmongo/:id', validateParamsObjectId, roleControllerMDB.getRoleByID);
userRouter.get('/rolesmongo', roleControllerMDB.getAllRoles);
userRouter.put('/rolesmongo/:id', validateParamsObjectId, roleControllerMDB.updateRole);
userRouter.delete('/rolesmongo/:id', validateParamsObjectId, roleControllerMDB.deleteRoleByID);

export default userRouter;