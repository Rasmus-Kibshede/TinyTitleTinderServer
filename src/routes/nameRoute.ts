/* eslint-disable no-unused-vars */
import { Router } from 'express';
import { createName, deleteNameByID, getNameByID, getAllNames, updateName } from '../Controllers/nameController';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { validateUniqueness } from '../Utils/routeUtil';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Name } from '../Entities/Name';

const nameRouter = Router();

nameRouter.post('/name', /*validateUniqueness(Name.name, 'name_suggest_name'),*/ createName);
nameRouter.get('/name/:id', getNameByID);
nameRouter.get('/names', getAllNames);
nameRouter.put('/name', updateName);
nameRouter.delete('/name/:id', deleteNameByID);

export default nameRouter;