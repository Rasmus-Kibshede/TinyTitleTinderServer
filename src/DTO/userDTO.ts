import { type Role } from './roleDTO';

export class User {
	userId: number;
	email: string;
	password: string;
	userActive: boolean;
	createdAt: string;
	lastLogin: string;
	role: Role[] | null;
}

