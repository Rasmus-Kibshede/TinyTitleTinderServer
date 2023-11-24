import { Router } from 'express';
import * as parentController from '../Controllers/parentController';
import { validateParamsId } from '../Utils/routeUtil';

const parentRouter = Router();

parentRouter.post('/parents', parentController.createParent);
parentRouter.get('/parents', parentController.getAllParents);
parentRouter.get('/parents/:id', validateParamsId, parentController.getParentById);
parentRouter.put('/parents', parentController.updateParent);
parentRouter.put('/parents/:id', validateParamsId, parentController.deleteParent);

export default parentRouter;