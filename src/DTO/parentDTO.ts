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
