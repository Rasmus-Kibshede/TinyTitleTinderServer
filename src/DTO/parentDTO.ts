import { Name } from '../Entities/Name';
import { User } from '../Entities/User';
export interface ParentResponseDTO{
parentId: number;
age: number;
gender: string;
firstName: string; 
lastName: string; 
user?: User;
names?: Name[] | null;
}

export interface ParentRequestDTO{
parentId?: number;
age: number;
gender: string;
firstName: string; 
lastName: string; 
user?: User;
}
