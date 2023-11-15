import { Family } from '../Entities/Family';
import { Name } from '../Entities/Name';
// import { User } from '../Entities/User';
import { Location } from '../Entities/Location';
import { UserRequestDTO, UserResponseDTO } from './userDTO';
export interface ParentResponseDTO{
parentId: number;
age: number;
gender: string;
firstName: string; 
lastName: string; 
user?: UserResponseDTO;
names?: Name[] | null;
families?: Family[];
location?: Location;
}

export interface ParentRequestDTO{
parentId?: number;
age: number;
gender: string;
firstName: string; 
lastName: string; 
user?: UserRequestDTO;
}
