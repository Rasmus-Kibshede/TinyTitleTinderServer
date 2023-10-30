import { Router } from 'express';
import { createName, deleteNameByID, getNameByID, getAllNames, updateName } from '../Controllers/nameController';
import { validateDate, validateParamsId } from '../Utils/routeUtil';

const nameRouter = Router();

nameRouter.post('/names', validateDate, createName);
nameRouter.get('/names/:id', validateParamsId, getNameByID);
nameRouter.get('/names', getAllNames);
nameRouter.put('/names', validateDate, updateName);
nameRouter.delete('/name/:id', validateParamsId, deleteNameByID);

export default nameRouter;