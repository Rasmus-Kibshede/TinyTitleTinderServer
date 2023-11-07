import { Request, Response } from 'express';
import * as meaningService from '../Services/meaningService';
import * as responseController from '../Controllers/responseController';
import { MeaningRequestDTO } from '../DTO/meaningDTO';

export const createMeaning = async (req: Request, res: Response) => {
	const meaningRequestDTO: MeaningRequestDTO = {
        definition: req.body.definition,
        names: req.body.names
	};
	const response = await meaningService.createMeaning(meaningRequestDTO);
	responseController.response(res, response, 200);
};

export const getMeaningByID = async (req: Request, res: Response) => {
	const response = await meaningService.getMeaningById(Number(req.params.id));

	responseController.response(res, response, 200);
};

export const getAllMeanings = async (req: Request, res: Response) => {
	const response = await meaningService.getMeanings();
	responseController.response(res, response, 200);
};

export const updateMeaning = async (req: Request, res: Response) => {

	const meaningRequestDTO: MeaningRequestDTO = {
		meaningId: req.body.meaningId,
        definition: req.body.definition,
        names: req.body.names
	};

	const response = await meaningService.updateMeaning(meaningRequestDTO);
	responseController.response(res, response, 200);
};

export const deleteMeaningByID = async (req: Request, res: Response) => {
	const response = await meaningService.deleteMeaning(Number(req.params.id));
	responseController.response(res, response, 204);
};