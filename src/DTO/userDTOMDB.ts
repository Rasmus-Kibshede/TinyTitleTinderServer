// import { RoleRequestDTO, RoleResponseDTO } from './roleDTO';

export interface UserResponseDTOMDB {
	email: string;
	userActive: boolean;
	roles: roleTitle[];
}

export interface UserRequestDTOMDB {
	email: string;
	password: string;
	userActive?: boolean;
	roles: roleTitle[];
}

export interface roleTitle {
	title: string;
}