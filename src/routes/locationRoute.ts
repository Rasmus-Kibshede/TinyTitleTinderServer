import { Router } from 'express';
import * as locationController from '../Controllers/locationController';
import { validateParamsId } from '../Utils/routeUtil';

const locationRouter = Router();

locationRouter.post('/locations', locationController.createLocation);
locationRouter.get('/locations', locationController.getAllLocations);
locationRouter.get('/locations/:id', validateParamsId, locationController.getLocationById);
locationRouter.put('/locations', locationController.updateLocation);
locationRouter.put('/locations/:id', validateParamsId, locationController.deleteLocation);

export default locationRouter;