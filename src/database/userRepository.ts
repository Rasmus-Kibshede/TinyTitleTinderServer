import { RowDataPacket } from 'mysql2';
import conn from './connectionMYSQL';

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
    console.log(rows);
    return { data: rows[0] };
};