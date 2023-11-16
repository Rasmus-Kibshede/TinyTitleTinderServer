import { Router } from 'express';
import * as nameController from '../Controllers/nameController';
import { validateDate, validateParamsId } from '../Utils/routeUtil';

const nameRouter = Router();

nameRouter.post('/names', validateDate, nameController.createName);
nameRouter.get('/names/:id', validateParamsId, nameController.getNameByID);
nameRouter.get('/names', nameController.getAllNames);
nameRouter.get('/names/parent/:id', nameController.getNamesByParentId);
nameRouter.put('/names', validateDate, nameController.updateName);
nameRouter.put('/names/:id', validateParamsId, nameController.deleteNameByID);

export default nameRouter;