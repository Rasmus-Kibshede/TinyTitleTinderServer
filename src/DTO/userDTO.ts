import { ParentRequestDTO } from './parentDTO';
import { RoleRequestDTO, RoleResponseDTO } from './roleDTO';


// export type UserDTO = UserResponseDTO | UserRequestDTO;

export interface UserResponseDTO {
	email: string;
	userActive: boolean;
	roles: RoleResponseDTO[] | RoleResponseDTO | null;
	parent?: ParentRequestDTO | null;
}

export interface UserRequestDTO {
	email: string;
	password: string;
	roles: RoleRequestDTO[] | RoleRequestDTO | null;
	parent?: ParentRequestDTO | null;
}

export interface UserLogin {
  email: string;
  password: string;
}
