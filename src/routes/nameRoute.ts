import { Router } from 'express';
import * as nameController from '../Controllers/nameController';
import { validateDate, validateParamsId } from '../Utils/routeUtil';

const nameRouter = Router();

nameRouter.get('/names', nameController.getAllNames);
nameRouter.get('/names/name=:name', nameController.getNameByNameSuggestName);
nameRouter.get('/names/:id', validateParamsId, nameController.getNameByID);
nameRouter.get('/names/parent/:id/:isliked', validateParamsId, nameController.getNamesByParentId);
nameRouter.get('/names/parent/:id', validateParamsId, nameController.getParentlessNames);
nameRouter.post('/names', validateDate, nameController.createName);
nameRouter.put('/names', validateDate, nameController.updateName);
nameRouter.put('/names/:id', validateParamsId, nameController.deleteNameByID);

export default nameRouter;