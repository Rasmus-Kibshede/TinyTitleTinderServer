import { RowDataPacket } from 'mysql2';
import conn from './connectionMYSQL';

export const getUserByID = async (id: number) => {
    const [rows] = await conn.query<RowDataPacket[]>('SELECT * FROM user WHERE user_id = (?)', [id]);
    return { data: rows[0] };
};