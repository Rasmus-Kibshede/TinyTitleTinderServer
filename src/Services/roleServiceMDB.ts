import { roleRepoMDB } from '../Repositories/roleRepository';
import { failed, success } from '../Utils/errorHandler';
import { RoleRequestDTOMDB, RoleResponseDTOMDB } from '../DTO/roleDTOMDB';
import { RoleMDB } from '../Entities/MongoDBEntities/RoleMDB';
import { ObjectId } from 'mongodb';

export const createRole = async (roleRequestDTO: RoleRequestDTOMDB) => {
    try {
        const response = await roleRepoMDB.save(roleRequestDTO);
        return success(convertToDTO(response));

    } catch (err) {
        return failed(err);
    }
};

export const getRoleById = async (id: string) => {
    try {
        const objectId = new ObjectId(id);
        const response = await roleRepoMDB.findOneByID(objectId);

        if (!response) {
            return failed('role');
        }
        return success(convertToDTO(response));

    } catch (err) {
        return failed(err);
    }
};

export const getRoles = async () => {
    try {
        const response = await roleRepoMDB.findAll();
        const roleDTOs: RoleRequestDTOMDB[] = response.map(role => convertToDTO(role));
        return success(roleDTOs);

    } catch (err) {
        return failed(err);
    }
};

export const updateRole = async (roleId: ObjectId, roleRequestDTO: RoleRequestDTOMDB) => {
    try {
        const response = await roleRepoMDB.findOneAndUpdate(
            { _id: roleId },
            { $set: roleRequestDTO },
            { returnDocument: 'after' }
        );

        return success(response.value);

    } catch (err) {
        return failed(err);
    }
};

export const deleteRoleByID = async (id: string) => {
    try {
        const objectId = new ObjectId(id);
        const response = await roleRepoMDB.findOneByID(objectId);
        if (!response) {
            return failed('role');
        }

        await roleRepoMDB.findOneAndDelete(response);
        return success(response);

    } catch (err) {
        return failed(err);
    }
};

export const convertToDTO = (role: RoleMDB) => {
    const dto: RoleResponseDTOMDB = {
        _id: role._id,
        title: role.title,
    };

    return dto;
};