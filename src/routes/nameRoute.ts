import { Router } from 'express';
import { createName, deleteNameByID, getNameByID, getAllNames, updateName } from '../Controllers/nameController';

const nameRouter = Router();

nameRouter.post('/name', createName);
nameRouter.get('/name/:id', getNameByID);
nameRouter.get('/names', getAllNames);
nameRouter.put('/name', updateName);
nameRouter.delete('/name/:id', deleteNameByID);

export default nameRouter;