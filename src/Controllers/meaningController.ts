import { Request, Response } from 'express';
import * as meaningService from '../Services/meaningService';
import { MeaningRequestDTO } from '../DTO/meaningDTO';

export const createMeaning = async (req: Request, res: Response) => {
	const meaningRequestDTO: MeaningRequestDTO = {
        definition: req.body.definition,
        names: req.body.names
	};
	const response = await meaningService.createMeaning(meaningRequestDTO);
	res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};

export const getMeaningByID = async (req: Request, res: Response) => {
	const response = await meaningService.getMeaningById(Number(req.params.id));

	res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};

export const getAllMeanings = async (req: Request, res: Response) => {
	const response = await meaningService.getMeanings();
	res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};

export const updateMeaning = async (req: Request, res: Response) => {

	const meaningRequestDTO: MeaningRequestDTO = {
		meaningId: req.body.meaningId,
        definition: req.body.definition,
        names: req.body.names
	};

	const response = await meaningService.updateMeaning(meaningRequestDTO);
	res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};

export const deleteMeaningByID = async (req: Request, res: Response) => {
	const response = await meaningService.deleteMeaning(Number(req.params.id));

	res.status(response.success ? 204 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};