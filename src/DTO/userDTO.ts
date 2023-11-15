import { type Role } from '../Entities/Role';
import { ParentRequestDTO } from './parentDTO';


// export type UserDTO = UserResponseDTO | UserRequestDTO;

export interface UserResponseDTO {
	email: string;
	userActive: boolean;
	roles: Role[] | null;
	parent?: ParentRequestDTO | null;
}

export interface UserRequestDTO {
	email: string;
	password: string;
	roles: Role[] | null;
	parent?: ParentRequestDTO | null;
}

export interface UserLogin {
	email: string;
	password: string;
}

