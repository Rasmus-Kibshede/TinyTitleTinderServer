import { User } from '../Entities/User';
import { AddressRequestDTO } from './addressDTO';
import { FamilyResponseDTO } from './familyDTO';
import { NameResponseDTO } from './nameDTO';
import { UserRequestDTO } from './userDTO';
export interface ParentResponseDTO{
parentId: number;
age: number;
gender: string;
firstName: string; 
lastName: string; 
user?: User;
names?: NameResponseDTO[] | null;
families: FamilyResponseDTO[];
}

export interface ParentRequestDTO{
parentId?: number;
age: number;
gender: string;
firstName: string; 
lastName: string; 
user?: UserRequestDTO;
address: AddressRequestDTO
}
