import { Router } from 'express';
import * as parentController from '../Controllers/parentController';
import { validateParamsId } from '../Utils/routeUtil';

const addressRouter = Router();

addressRouter.post('/parents', parentController.createParent);
addressRouter.get('/parents', parentController.getAllParents);
addressRouter.get('/parents/:id', validateParamsId, parentController.getParentById);
addressRouter.put('/parents', parentController.updateParent);
addressRouter.put('/parents/:id', validateParamsId, parentController.deleteParent);

export default addressRouter;