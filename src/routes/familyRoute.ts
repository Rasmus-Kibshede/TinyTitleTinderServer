import { Router } from 'express';
import * as familyController from '../Controllers/familyController';
import { validateParamsId } from '../Utils/routeUtil';

const familyRoute = Router();

familyRoute.post('/families', familyController.createFamily);
familyRoute.get('/families', familyController.getAllFamilies);
familyRoute.get('/families/:id', validateParamsId, familyController.getFamilyById);
familyRoute.put('/families', familyController.updateFamily);
familyRoute.put('/families/:id', validateParamsId, familyController.deleteFamily);

export default familyRoute;