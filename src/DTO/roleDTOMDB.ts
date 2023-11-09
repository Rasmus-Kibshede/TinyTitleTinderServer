import { ObjectId } from 'mongodb';

export interface RoleResponseDTOMDB {
    _id: ObjectId;
    title: string;
}

export interface RoleRequestDTOMDB {
    _id?: ObjectId;
    title: string;
}
