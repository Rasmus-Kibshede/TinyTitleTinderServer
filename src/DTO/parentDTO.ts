import { User } from '../Entities/User';
export interface ParentResponseDTO{
parentId: number;
age: number;
gender: string;
firstName: string; 
lastName: string; 
user: User;
}

export interface ParentRequestDTO{
parentId?: number;
age: number;
gender: string;
firstName: string; 
lastName: string; 
user?: User;
}
