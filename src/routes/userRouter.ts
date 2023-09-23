
import {Router} from "express";
// Import { User } from '../model/user'
import connection from "../database/connectionMYSQL";

const router = Router();

router.get("/user/:id", async (req, res) => {
	const [rows] = await connection.query("select * from user where user_id = (?)", [req.params.id]);
	res.send({data: rows});
});

export default router;
