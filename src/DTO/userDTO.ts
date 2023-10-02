import { type Role } from './roleDTO';


export type UserDTO = User | UserCreationDTO;

interface User {
	userId: number;
	email: string;
	password: string;
	userActive: boolean;
	createdAt: string;
	lastLogin: string;
	roles: Role[] | null;
}

interface UserCreationDTO {
	email: string;
	password: string;
	roles: Role[] | null;
}

