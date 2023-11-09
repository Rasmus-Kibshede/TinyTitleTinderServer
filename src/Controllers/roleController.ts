import { Request, Response } from 'express';
import * as roleService from '../Services/roleService';
import * as responseController from '../Controllers/responseController';
import { RoleRequestDTO, RoleTitle } from '../DTO/roleDTO';

export const createRole = async (req: Request, res: Response) => {
	const roleRequestDTO: RoleTitle = {
        title: req.body.title
    };
	const response = await roleService.createRole(roleRequestDTO);
	responseController.response(res, response, 200);
};

export const getRoleByID = async (req: Request, res: Response) => {
	const response = await roleService.getRoleById(Number(req.params.id));
	responseController.response(res, response, 200);
};

export const getAllRoles = async (req: Request, res: Response) => {
	const response = await roleService.getRoles();
	responseController.response(res, response, 200);
};

export const updateRole = async (req: Request, res: Response) => {
	const roleRequestDTO: RoleRequestDTO = {
		roleId: req.body.roleId,
		title: req.body.title,
		users: req.body.users
	};

	const response = await roleService.updateRole(roleRequestDTO);
	responseController.response(res, response, 200);
};

export const deleteRoleByID = async (req: Request, res: Response) => {
	const response = await roleService.deleteRoleByID(Number(req.params.id));
	responseController.response(res, response, 204);
};

