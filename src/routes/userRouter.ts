import { Router } from 'express';
import { User } from '../model/user';
const router = Router();

router.get('/user/:id', (req, res) => {
	const user: any = {
		userId: req.params.id,
		email: 'test@test.com,',
		password: 'password1234',
		userActive: true,
		createdAt: '1-12-22 12:00',
		lastLogin: '2-12-22 13:00',
	};  
	res.send({data: user});
});

export default router;
