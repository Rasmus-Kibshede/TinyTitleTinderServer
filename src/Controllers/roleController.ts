import { Request, Response } from 'express';
import * as roleService from '../Services/roleService';
import { RoleRequestDTO, RoleResponseDTO } from '../DTO/roleDTO';

export const createRole = async (req: Request, res: Response) => {
	const roleRequestDTO: RoleRequestDTO = {
		
	};
	const response = await roleService.createRole(roleRequestDTO);
	res.send(response);
};

export const getRoleByID = async (req: Request, res: Response) => {
	const response = await roleService.getRoleByID(Number(req.params.id));

	roleResponse(response ? response : { err: response }, res, 200);
};

export const getAllRoles = async (req: Request, res: Response) => {
	const response = await roleService.getRoles();
	res.send(response);
};

export const updateRole = async (req: Request, res: Response) => {

	const roleRequestDTO: RoleRequestDTO = {
		
	};

	const response = await roleService.updateRole(roleRequestDTO, req.body.email);
	roleResponse(response ? response : { err: response }, res, 201);
};

export const deleteRoleByID = async (req: Request, res: Response) => {
	const response = await roleService.deleteRoleByID(Number(req.params.id));

	roleResponse(response ? response : { err: response }, res, 201);
};

const roleResponse = (response: RoleResponseDTO | { err: string }, res: Response, statusCode: number) => {
	if (!response) {
		res.status(404).send({ err: response });
	} else {
		res.status(statusCode).send(response);
	}
};