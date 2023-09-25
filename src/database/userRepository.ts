import { RowDataPacket } from 'mysql2';
import conn from './connectionMYSQL';
import { User } from '../model/user';

export const createUser = async (user: User) => {
    const [rows] = await conn.query<RowDataPacket[]>('INSERT INTO user (email, password, user_active, created_at, last_login, role) VALUES (?),(?),(?),(?),(?,(?)', [user.email, user.password, user.userActive ? 1 : 0, user.createdAt, user.lastLogin, user.role]);
    return { user: rows[0] };
};

export const getUserByID = async (id: number) => {
    const [rows] = await conn.query<RowDataPacket[]>('SELECT * FROM user WHERE user_id = (?)', [id]);
    return { data: rows[0] };
};

export const getUsers = async () => {
    const [rows] = await conn.query<RowDataPacket[]>('SELECT * FROM user');
    return { data: rows };
};

export const deleteUser = async (id: number) => {
    const [rows] = await conn.query<RowDataPacket[]>('UPDATE user SET user_active = 0 WHERE user_id = (?)', [id]);
    return { data: rows[0] };
};
