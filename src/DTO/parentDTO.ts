import { User } from '../Entities/User';

export type Parent = {
	parentId: number;
	age: number;
	gender: string;
	firstName: string;
	lastName: string;
	userId: number;
	locationId: number;
	inviteId: number;
	user: User;
};

export type ParentDTO = ParentResponseDTO | ParentRequestDTO;

interface ParentResponseDTO {
	email: string;
	password: string;
	userActive: boolean;
	
}

interface ParentRequestDTO {
	email: string;
	password: string;
	
}

