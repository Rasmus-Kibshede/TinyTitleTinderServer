import { Request, Response } from 'express';
import * as nameService from '../Services/nameService';
import { NameRequestDTO, NameResponseDTO } from '../DTO/nameDTO';

export const createName = async (req: Request, res: Response) => {
  const nameRequestDTO: NameRequestDTO = {
    nameSuggestName: req.body.name,
    gender: req.body.gender,
    nameDays: req.body.namedays,
    namesakes: req.body.namesakes,
  };

  const response = await nameService.createName(nameRequestDTO);
  res.send(response);
};

export const getNameByID = async (req: Request, res: Response) => {
  const response = await nameService.getNameByID(Number(req.params.id));

  nameResponse(response ? response : { err: response }, res, 200);
};

export const getAllNames = async (req: Request, res: Response) => {
  const response = await nameService.getNames();

  res.send(response);
};

export const updateName = async (req: Request, res: Response) => {
  const nameRequestDTO: NameRequestDTO = {
    nameSuggestName: req.body.newName,
    gender: req.body.gender,
  };

  const response = await nameService.updateName(nameRequestDTO, req.body.name);
  res.send(response);
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
