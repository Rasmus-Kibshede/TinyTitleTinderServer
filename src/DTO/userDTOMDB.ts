import { ParentMDB } from '../Entities/MongoDBEntities/ParentMDB';
import { RoleMDB } from '../Entities/MongoDBEntities/RoleMDB';

export interface UserResponseDTOMDB {
	email: string;
	userActive: boolean | true;
	roles: RoleMDB[];
	parent: ParentMDB;
}

export interface UserRequestDTOMDB {
	email: string;
	password: string;
	roles: RoleMDB[];
	parent: ParentMDB;
}

export interface userLogin {
	email: string;
	password: string;
}
