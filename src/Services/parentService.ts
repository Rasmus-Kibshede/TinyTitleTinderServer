import { parentRepo } from '../Repositories/parentRepository';
import { Parent } from '../Entities/Parent';
import { ParentRequestDTO, ParentResponseDTO } from '../DTO/parentDTO';

export const createParent = async (parentRequestDTO: ParentRequestDTO) => {
    try {
        const save = await parentRepo.save(parentRequestDTO);
        return convertToDTO(save);

    } catch (error) {
        return error.message === 'Something went wrong!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
    }
};

export const getParents = async () => {
    try {
       
        const parents = await parentRepo.findAll();
        const parentDTOs: ParentRequestDTO[] = parents.map(parent => convertToDTO(parent));
        return parentDTOs;

    } catch (error) {
        return error.message === 'Couldn\'t find any parents!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
    }
};

export const getParentById = async (id: number) => {
    try {
         //TODO get user with role from userRepo
        //TODO get names with origins and meaning from nameRepo. 
        const response = await parentRepo.findOneByID(id);
        
        if (!response) {
            return { err: 'Invalid id' };
        }
        return convertToDTO(response);

    } catch (error) {
        console.log(error);
        
        return error.message === 'Couldn\'t find a parent with that id!' ? { err: error.message } : { err: 'Something terrible went wrong!- we are working on it!' };
    }
};

export const updateParent = async (parentDTO: ParentRequestDTO) => {
    try {
        if (!parentDTO) {
            return { err: 'Invalid parent DTO!' };
        }
        const response = await parentRepo.save(parentDTO);
        return convertToDTO(response);

    } catch (error) {
        return error.message === 'Couldn\'t find any parents!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
    }
};

export const deleteParent = async (parentId: number) => {
    try {
        if (!parentId) {
            return { err: 'Invalid parent id!' };
        }
        const parentDB = await parentRepo.findOneByID(parentId);

        if (!parentDB) {
            return { err: 'Invalid Parent' };
        }
        const response = await parentRepo.remove(parentDB);
        return convertToDTO(response);

    } catch (error) {
        return error.message === 'Couldn\'t find any parent!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
    }
};

export const convertToDTO = (parent: Parent) => {
    const dto: ParentResponseDTO = {
        parentId: parent.parentId,
        age: parent.age,
        gender: parent.gender,
        firstName: parent.firstName,
        lastName: parent.lastName,
        user: parent.user,
        names: parent.names
    };
    return dto;
};