import { Request, Response } from 'express';
import * as nameService from '../Services/nameService';
import { NameRequestDTO } from '../DTO/nameDTO';

export const createName = async (req: Request, res: Response) => {
  const nameRequestDTO: NameRequestDTO = {
    nameSuggestName: req.body.nameSuggestName,
    gender: req.body.gender,
    nameDays: req.body.nameDays,
    namesakes: req.body.namesakes,
    origins: req.body.origins,
    meanings: req.body.meanings,
  };

  const response = await nameService.createName(nameRequestDTO);
  res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};

export const getNameByID = async (req: Request, res: Response) => {
  const response = await nameService.getNameByID(Number(req.params.id));

  res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};

export const getAllNames = async (req: Request, res: Response) => {
  const response = await nameService.getNames();
  res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};

// TODO: Rafactor to update name by id
export const updateName = async (req: Request, res: Response) => {
  const nameRequestDTO: NameRequestDTO = {
    nameSuggestId: req.body.nameId,
    nameSuggestName: req.body.nameSuggestName,
    gender: req.body.gender,
    nameDays: req.body.nameDays,
    namesakes: req.body.namesakes,
    origins: req.body.origins,
    meanings: req.body.meanings,
  };

  const response = await nameService.updateName(nameRequestDTO);
  res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};

export const deleteNameByID = async (req: Request, res: Response) => {
  const response = await nameService.deleteNameByID(Number(req.params.id));
  res.status(response.success ? 204 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};
