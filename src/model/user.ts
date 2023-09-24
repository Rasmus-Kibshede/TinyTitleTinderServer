import {type Role} from './role';

export type User = {
	userId: number;
	email: string;
	password: string;
	userActive: boolean;
	createdAt: string;
	lastLogin: string;
	role: Role[];
};

