import { UserRequestDTO, UserResponseDTO } from './userDTO';
export interface RoleResponseDTO {
	roleId: number;
	title: string;
	users: UserResponseDTO[];
}

export interface RoleRequestDTO {
	roleId: number;
	title: string;
	users: UserRequestDTO[];
}

export interface RoleTitle {
	title: string;
}

