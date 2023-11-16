import { Address } from '../Entities/Address';
import { Family } from '../Entities/Family';
import { Name } from '../Entities/Name';
// import { User } from '../Entities/User';
import { AddressRequestDTO, AddressResponseDTO } from './addressDTO';
import { UserRequestDTO, UserResponseDTO } from './userDTO';
export interface ParentResponseDTO {
  parentId: number;
  age: number;
  gender: string;
  firstName: string;
  lastName: string;
  user?: UserResponseDTO;
  names?: Name[] | null;
  families: Family[];
  adress: AddressResponseDTO;
}

export interface ParentRequestDTO {
  parentId?: number;
  age: number;
  gender: string;
  firstName: string;
  lastName: string;
  user?: UserRequestDTO;
  address: Address | AddressRequestDTO;
}
