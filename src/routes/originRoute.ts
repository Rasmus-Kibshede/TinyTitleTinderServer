import { Router } from 'express';
import * as originController from '../Controllers/originController';
import { validateParamsId } from '../Utils/routeUtil';

const originRouter = Router();

originRouter.post('/origins', originController.createOrigin);
originRouter.get('/origins', originController.getAllOrigins);
originRouter.get('/origins/:id', validateParamsId, originController.getOriginByID);
originRouter.put('/origins', originController.updateOrigin);
originRouter.put('/origins/:id', validateParamsId, originController.deleteOrigin);

export default originRouter;