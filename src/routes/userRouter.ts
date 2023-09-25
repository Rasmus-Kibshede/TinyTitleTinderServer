import { Router } from 'express';
// import { User } from '../model/user';
import connection from '../database/connectionMYSQL';
import { RowDataPacket } from 'mysql2';

const router = Router();

router.get('/user/:id', async (req, res) => {
	if (!req.params.id) {
		return res.status(400).send({ error: 'User id is required' });
	} else {
		const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM user WHERE user_id = (?)', [req.params.id]);

		if (rows.length === 0)
			return res.status(404).send({ error: 'User not found' });
		return res.send({ data: rows[0] });
	}
});

export default router;
