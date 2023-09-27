import {type User} from './userDTO';

export type Parent = {
	parentIt: number;
	age: number;
	gender: string;
	firstName: string;
	lastName: string;
	userId: number;
	locationId: number;
	inviteId: number;
	user: User;
};
