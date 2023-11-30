import { Request, Response } from 'express';
import * as nameService from '../Services/nameService';
import * as responseController from '../Controllers/responseController';
import { NameRequestDTO } from '../DTO/nameDTO';

export const createName = async (req: Request, res: Response) => {
  const nameRequestDTO: NameRequestDTO = {
    nameSuggestName: req.body.nameSuggestName,
    gender: req.body.gender,
    nameDays: req.body.nameDays,
    namesakes: req.body.namesakes,
    origins: req.body.origins,
  };

  const response = await nameService.createName(nameRequestDTO);
  responseController.response(res, response, 201);
};

export const getNameByID = async (req: Request, res: Response) => {
  const response = await nameService.getNameByID(Number(req.params.id));
  responseController.response(res, response, 200);
};

export const getNameByNameSuggestName = async (req: Request, res: Response) => {
const response = await nameService.getNameByNameSuggestName(req.params.name);
responseController.response(res, response, 200);
};


export const getAllNames = async (req: Request, res: Response) => {
  const response = await nameService.getNames();
  responseController.response(res, response, 200);
};

export const getNamesByParentId = async (req: Request, res: Response) => {
  const response = await nameService.getNamesByParentId(Number(req.params.id), req.params.isliked);
  responseController.response(res, response, 200);
};

export const getParentlessNames = async (req: Request, res: Response) => {
  const response = await nameService.getParentlessNames(Number(req.params.id));
  responseController.response(res, response, 200);
};

export const updateName = async (req: Request, res: Response) => {
  const nameRequestDTO: NameRequestDTO = {
    nameSuggestId: req.body.nameId,
    nameSuggestName: req.body.nameSuggestName,
    gender: req.body.gender,
    nameDays: req.body.nameDays,
    namesakes: req.body.namesakes,
    origins: req.body.origins,
  };

  const response = await nameService.updateName(nameRequestDTO);
  responseController.response(res, response, 200);
};

export const deleteNameByID = async (req: Request, res: Response) => {
  const response = await nameService.deleteNameByID(Number(req.params.id));
  responseController.response(res, response, 204);
};


