import { AddressRequestDTO, AddressResponseDTO } from './addressDTO';
import { FamilyResponseDTO } from './familyDTO';
import { NameResponseDTO } from './nameDTO';
export interface ParentResponseDTO {
  parentId?: number;
  age: number;
  gender: string;
  firstName: string;
  lastName: string;
  likedNames?: NameResponseDTO[];
  dislikedNames?: NameResponseDTO[];
  families?: FamilyResponseDTO[];
  address: AddressResponseDTO;
}

export interface ParentRequestDTO {
  parentId?: number;
  age: number;
  gender: string;
  firstName: string;
  lastName: string;
  names?: NameResponseDTO[];
  families?: FamilyResponseDTO[];
  address: AddressRequestDTO;
}
