import express from 'express';
import * as definitionController from '../Controllers/definitionController';
import { validateParamsId } from '../Utils/routeUtil';

const definitionRoute = express.Router();

definitionRoute.post('/definitions', definitionController.createDefinition);
definitionRoute.get('/definitions/:id', validateParamsId, definitionController.getDefinitionByID);
definitionRoute.get('/definitions', definitionController.getAllDefinitions);
definitionRoute.put('/definitions', definitionController.updateDefinition);
definitionRoute.put('/definitions/:id', validateParamsId, definitionController.deleteDefinitionByID);

export default definitionRoute;
