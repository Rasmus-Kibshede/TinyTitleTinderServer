import { Role } from "./role"

export interface User {
    userId: number,
    email: string,
    password: string,
    userActive: boolean,
    createdAt: string,
    lastLogin: string,
    role: Role[]
}



