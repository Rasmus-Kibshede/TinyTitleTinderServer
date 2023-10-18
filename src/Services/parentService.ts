//import { createUser as newUser } from '../Repositorys/userRepository';
import { parentRepo } from '../Repositories/parentRepository';
import { Parent } from '../Entities/Parent';
import { ParentDTO } from '../DTO/parentDTO';

export const createParent = async (parentDTO: ParentDTO) => {
    const save = await parentRepo.save(parentDTO);

    if (!save) {
        return { err: 'Parent not saved' };
    }

    return convertToDTO(save);
};

export const getParentByID = async (id: number) => {
    const response = await parentRepo.findOneByID(id);

    if (!response) {
        return { err: 'Parent not found' };
    }

    return convertToDTO(response);
};

export const getParents = async () => {
    const parents = await parentRepo.findAll();
    const parentDTOs: ParentDTO[] = parents.map(parent => convertToDTO(parent));
    return parentDTOs;
};

export const updateParent = async (parentDTO: ParentDTO, id: number) => {
    //Future Developer log
    if (!parentDTO) {
        return { err: 'invalid parentDTO' };
    }

    const parentDB = await getParentsByID(id) as Parent;
    if (!parentDB) {
        return { err: 'Parent not found' };
    }

    const savedParent = await parentRepo.save(parentDB) as Parent;
    if (!savedParent) {
        return { err: 'User could not be saved' };
    }

    return convertToDTO(savedParent);
};

export const deleteParentByID = async (id: number) => {
    const response = await parentRepo.findOneByID(id);

    if (!response || !response.parentActive) {
        return { err: 'User not found' };
    }

    response.parentActive = false;

    return convertToDTO(await parentRepo.save(response)) || { err: 'Parent not deleted' };
};

const convertToDTO = (parent: Parent) => {
    const dto: ParentDTO = {
        
    };

    return dto;
};
