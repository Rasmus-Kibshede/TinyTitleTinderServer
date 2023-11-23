import { AddressRequestDTO, AddressResponseDTO } from './addressDTO';
import { FamilyResponseDTO } from './familyDTO';
import { NameResponseDTO } from './nameDTO';
export interface ParentResponseDTO {
  parentId?: number;
  age: number;
  gender: string;
  firstName: string;
  lastName: string;
  names?: NameResponseDTO[] | null;
  families: FamilyResponseDTO[];
  address: AddressResponseDTO;
}

export interface ParentRequestDTO {
  parentId?: number;
  age: number;
  gender: string;
  firstName: string;
  lastName: string;
  address: AddressRequestDTO;
}
