import { AddressRequestDTO } from './addressDTO';
import { FamilyResponseDTO } from './familyDTO';
import { NameResponseDTO } from './nameDTO';
export interface ParentResponseDTO {
    parentId: number;
    age: number;
    gender: string;
    firstName: string;
    lastName: string;
    names?: NameResponseDTO[] | null;
    families: FamilyResponseDTO[];
}

export interface ParentRequestDTO {
    parentId?: number;
    age: number;
    gender: string;
    firstName: string;
    lastName: string;
    address: AddressRequestDTO
}
