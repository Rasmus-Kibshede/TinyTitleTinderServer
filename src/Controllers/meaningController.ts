import { Request, Response } from 'express';
import * as meaningService from '../Services/meaningService';
import { MeaningRequestDTO, MeaningResponseDTO } from '../DTO/meaningDTO';

export const createMeaning = async (req: Request, res: Response) => {
	const meaningRequestDTO: MeaningRequestDTO = {
        meaningId: req.body.meaningId,
        definition: req.body.definition,
        names: req.body.names
	};
	const response = await meaningService.createMeaning(meaningRequestDTO);
	meaningResponse(response ? response : { err: response }, res, 200);
};

export const getMeaningByID = async (req: Request, res: Response) => {
	const response = await meaningService.getMeaningById(Number(req.params.id));

	meaningResponse(response ? response : { err: response }, res, 200);
};

export const getAllMeanings = async (req: Request, res: Response) => {
	const response = await meaningService.getMeanings();
	if (!response) {
		res.status(404).send({ err: response });
	} else {
		res.status(200).send(response);
	}
};

export const updateUser = async (req: Request, res: Response) => {

	const meaningRequestDTO: MeaningRequestDTO = {
		meaningId: req.body.meaningId,
        definition: req.body.definition,
        names: req.body.names
	};

	const response = await meaningService.updateMeaning(meaningRequestDTO);
	meaningResponse(response ? response : { err: response }, res, 201);
};

export const deleteMeaningByID = async (req: Request, res: Response) => {
	const response = await meaningService.deleteMeaning(Number(req.params.id));

	meaningResponse(response ? response : { err: response }, res, 201);
};

const meaningResponse = (response: MeaningResponseDTO | { err: string }, res: Response, statusCode: number) => {
	if (!response) {
		res.status(404).send({ err: response });
	} else {
		res.status(statusCode).send(response);
	}
};