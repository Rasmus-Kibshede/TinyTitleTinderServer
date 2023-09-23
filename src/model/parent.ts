import {type User} from "./user";

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
