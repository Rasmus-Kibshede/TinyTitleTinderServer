import { Request, Response } from 'express';
import * as nameService from '../Services/nameService';
import { NameRequestDTO, NameResponseDTO } from '../DTO/nameDTO';

export const createName = async (req: Request, res: Response) => {
  const nameRequestDTO: NameRequestDTO = {
    nameSuggestName: req.body.name,
    gender: req.body.gender,
    nameDays: req.body.nameDays,
    namesakes: req.body.namesakes
  };

  const response = await nameService.createName(nameRequestDTO);
  nameResponse(response ? response : { err: response }, res, 200);
};

export const getNameByID = async (req: Request, res: Response) => {
  const response = await nameService.getNameByID(Number(req.params.id));

  nameResponse(response ? response : { err: response }, res, 200);
};

export const getAllNames = async (req: Request, res: Response) => {
  const response = await nameService.getNames();

  if (!response) {
    res.status(404).send({ err: response });
  } else {
    res.status(200).send(response);
  }
};

// TODO: Rafactor to update name by id
export const updateName = async (req: Request, res: Response) => {
  const nameRequestDTO: NameRequestDTO = {
    nameSuggestId: Number(req.body.id),
    nameSuggestName: req.body.nameSuggestName,
    gender: req.body.gender,
    nameDays: req.body.nameDays,
    namesakes: req.body.namesakes
  };

  const response = await nameService.updateName(nameRequestDTO);
  nameResponse(response ? response : { err: response }, res, 200);
};

export const deleteNameByID = async (req: Request, res: Response) => {
  const response = await nameService.deleteNameByID(Number(req.params.id));

  nameResponse(response ? response : { err: response }, res, 200);
};

const nameResponse = (response: NameResponseDTO | { err: string }, res: Response, statusCode: number) => {
  if (!response) {
    res.status(404).send({ err: response });
  } else {
    res.status(statusCode).send(response);
  }
};
