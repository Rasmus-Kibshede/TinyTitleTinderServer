import { Request, Response } from 'express';
import * as roleService from '../Services/roleService';
import { RoleRequestDTO, RoleTitle, RoleResponseDTO } from '../DTO/roleDTO';

export const createRole = async (req: Request, res: Response) => {
	const roleRequestDTO: RoleTitle = {
        title: req.body.title
    };
	const response = await roleService.createRole(roleRequestDTO);
	roleResponse(response ? response : { err: response }, res, 200);
};

export const getRoleByID = async (req: Request, res: Response) => {
	const response = await roleService.getRoleById(Number(req.params.id));
	roleResponse(response ? response : { err: response }, res, 200);
};

export const getAllRoles = async (req: Request, res: Response) => {
	const response = await roleService.getRoles();

	if (!response) {
		res.status(404).send({ err: response });
	} else {
		res.status(200).send(response);
	}
};

export const updateRole = async (req: Request, res: Response) => {
	const roleRequestDTO: RoleRequestDTO = {
		roleId: req.body.roleId,
		title: req.body.title,
		users: req.body.users
	};

	const response = await roleService.updateRole(roleRequestDTO);
	
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
