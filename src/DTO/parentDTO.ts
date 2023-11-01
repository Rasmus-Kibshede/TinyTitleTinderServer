import { Family } from '../Entities/Family';
import { Name } from '../Entities/Name';
import { User } from '../Entities/User';
import { Location } from '../Entities/Location';
export interface ParentResponseDTO{
parentId: number;
age: number;
gender: string;
firstName: string; 
lastName: string; 
user?: User;
names?: Name[] | null;
families: Family[];
location: Location;
}

export interface ParentRequestDTO{
parentId?: number;
age: number;
gender: string;
firstName: string; 
lastName: string; 
user?: User;
}
