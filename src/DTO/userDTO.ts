import { type Role } from './roleDTO';


export type UserDTO = UserResponseDTO | UserRequestDTO;

interface UserResponseDTO {
	email: string;
	password: string;
	userActive: boolean;
	roles: Role[] | null;
}

interface UserRequestDTO {
	email: string;
	password: string;
	roles: Role[] | null;
}

