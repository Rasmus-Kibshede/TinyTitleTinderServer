import { User } from "./user"

export interface Parent{
    parentIt: number,
    age: number,
    gender: string,
    firstName: string,
    lastName: string,
    userId: number,
    locationId: number,
    inviteId: number
    user: User
}