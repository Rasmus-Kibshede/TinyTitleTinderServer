import { Request, Response } from 'express';
import * as definitionService from '../Services/definitionService';
import * as responseController from './responseController';
import { DefinitionRequestDTO } from '../DTO/definitionDTO';

export const createDefinition = async (req: Request, res: Response) => {
	const definitionRequestDTO: DefinitionRequestDTO = {
		meaning: req.body.meaning
	};
	const response = await definitionService.createDefinition(definitionRequestDTO);
	responseController.response(res, response, 200);
};

export const getDefinitionByID = async (req: Request, res: Response) => {
	const response = await definitionService.getDefinitionById(Number(req.params.id));
	responseController.response(res, response, 200);
};

export const getAllDefinitions = async (req: Request, res: Response) => {
	const response = await definitionService.getDefinitions();
	responseController.response(res, response, 200);
};

export const updateDefinition = async (req: Request, res: Response) => {

	const definitionRequestDTO: DefinitionRequestDTO = {
		definitionId: req.body.definitionId,
		meaning: req.body.meaning
	};

	const response = await definitionService.updateDefinition(definitionRequestDTO);
	responseController.response(res, response, 200);
};

export const deleteDefinitionByID = async (req: Request, res: Response) => {
	const response = await definitionService.deleteDefinition(Number(req.params.id));
	responseController.response(res, response, 204);
};