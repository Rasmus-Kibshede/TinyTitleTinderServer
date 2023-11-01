import express from 'express';
import * as meaningController from '../Controllers/meaningController';
import { validateParamsId } from '../Utils/routeUtil';

const meaningRoute = express.Router();

meaningRoute.post('/meanings',  meaningController.createMeaning);
meaningRoute.get('/meanings/:id', validateParamsId, meaningController.getMeaningByID);
meaningRoute.get('/meanings', meaningController.getAllMeanings);
meaningRoute.put('/meanings',  meaningController.updateMeaning);
meaningRoute.put('/meaning/:id', validateParamsId, meaningController.deleteMeaningByID);

export default meaningRoute;
