import { Request, Response } from 'express';
import * as roleServiceMDB from '../Services/roleServiceMDB';
import * as responseController from './responseController';
import { RoleRequestDTOMDB } from '../DTO/roleDTOMDB';
import { ObjectId } from 'mongodb';

export const createRole = async (req: Request, res: Response) => {
	const roleRequestDTO: RoleRequestDTOMDB = {
		title: req.body.title
	};
	const response = await roleServiceMDB.createRole(roleRequestDTO);
	responseController.response(res, response, 201);
};

export const getRoleByID = async (req: Request, res: Response) => {
	const id = req.params.id;
	const response = await roleServiceMDB.getRoleById(id);
	responseController.response(res, response, 200);
};

export const getAllRoles = async (req: Request, res: Response) => {
	const response = await roleServiceMDB.getRoles();
	responseController.response(res, response, 200);
};

export const updateRole = async (req: Request, res: Response) => {
	const id = new ObjectId(req.params.id);
	const roleRequestDTO: RoleRequestDTOMDB = {
		title: req.body.title
	};

	const response = await roleServiceMDB.updateRole(id, roleRequestDTO);
	responseController.response(res, response, 200);
};

export const deleteRoleByID = async (req: Request, res: Response) => {
	const id = req.params.id;
	const response = await roleServiceMDB.deleteRoleByID(id);
	responseController.response(res, response, 204);
};

