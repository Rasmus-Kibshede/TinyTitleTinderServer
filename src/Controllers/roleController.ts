import { Request, Response } from 'express';
import * as roleService from '../Services/roleService';
import { RoleRequestDTO, RoleTitle } from '../DTO/roleDTO';

export const createRole = async (req: Request, res: Response) => {
	const roleRequestDTO: RoleTitle = {
        title: req.body.title
    };
	const response = await roleService.createRole(roleRequestDTO);
	res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};

export const getRoleByID = async (req: Request, res: Response) => {
	const response = await roleService.getRoleById(Number(req.params.id));
	res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};

export const getAllRoles = async (req: Request, res: Response) => {
	const response = await roleService.getRoles();

	res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};

export const updateRole = async (req: Request, res: Response) => {
	const roleRequestDTO: RoleRequestDTO = {
		roleId: req.body.roleId,
		title: req.body.title,
		users: req.body.users
	};

	const response = await roleService.updateRole(roleRequestDTO);
	
	res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};

export const deleteRoleByID = async (req: Request, res: Response) => {
	const response = await roleService.deleteRoleByID(Number(req.params.id));
	res.status(response.success ? 204 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};

