import { RoleMDB } from '../Entities/MongoDBEntities/RoleMDB';
import { UserMDB } from '../Entities/MongoDBEntities/UserMDB';
import { userRepoMDB } from '../Repositories/userRepository';

export const createUser = async () => {
    const user = new UserMDB();
	user.email = 'fdassda@email.com';
	user.password = '12345678KkIkLkj%&¤233#%&¤';
	user.userActive = true;
	user.createdAt = new Date();
	user.lastLogin = new Date();
	user.roles = [
		new RoleMDB('admin'),
        new RoleMDB('user')
	];

	await userRepoMDB.save(user);
};