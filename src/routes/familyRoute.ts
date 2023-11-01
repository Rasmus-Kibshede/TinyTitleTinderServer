import { Router } from 'express';
import * as familyController from '../Controllers/familyController';
import { validateParamsId } from '../Utils/routeUtil';

const familyRoute = Router();

familyRoute.post('/parents', familyController.createFamily);
familyRoute.get('/parents', familyController.getAllFamilies);
familyRoute.get('/parents/:id', validateParamsId, familyController.getFamilyById);
familyRoute.put('/parents', familyController.updateFamily);
familyRoute.put('/parents/:id', validateParamsId, familyController.deleteFamily);

export default familyRoute;