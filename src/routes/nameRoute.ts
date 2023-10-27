import { Router } from 'express';
import { createName, deleteNameByID, getNameByID, getNames, updateName } from '../Services/nameService';

const nameRouter = Router();

nameRouter.post('/name', createName);
nameRouter.get('/name', getNameByID);
nameRouter.get('/names', getNames);
nameRouter.put('/name', updateName);
nameRouter.delete('/name', deleteNameByID);