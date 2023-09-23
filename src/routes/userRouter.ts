import { Router } from 'express';
import { User } from '../model/user';
import connection from '../database/connectionMYSQL';

const router = Router();

router.get('/user/:id', async (req, res) => {
	const [rows,fields] = await connection.query('select * from user where userID = (?)', [req.params.id]);
	res.send({data: rows})
});

export default router;
