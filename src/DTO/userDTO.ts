import { type Role } from './roleDTO';


// export type UserDTO = UserResponseDTO | UserRequestDTO;

export interface UserResponseDTO {
	email: string;
	userActive: boolean;
	roles: Role[] | null;
}

export interface UserRequestDTO {
	email: string;
	password: string;
	roles: Role[] | null;
}

export interface userLogin {
	email: string;
	password: string;
}

