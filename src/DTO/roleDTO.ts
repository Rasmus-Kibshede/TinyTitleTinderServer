import { User } from '../Entities/User';
export interface RoleResponseDTO {
	roleId: number;
	title: string;
	users: User[];
}

export interface RoleRequestDTO {
	roleId: number;
	title: string;
	users: User[];
}

export interface RoleTest {
	title: string;
}

