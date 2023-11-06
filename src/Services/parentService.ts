import { parentRepo } from '../Repositories/parentRepository';
import { Parent } from '../Entities/Parent';
import { ParentRequestDTO, ParentResponseDTO } from '../DTO/parentDTO';
import { Result, ApiResponse, failed, generateStatusCode } from '../Utils/errorHandler';
import { BaseError } from '../Utils/BaseError';

const invalidIdError = new Error('No parent with that id');

export const createParent = async (parentRequestDTO: ParentRequestDTO) => {
    try {
        const response = await parentRepo.save(parentRequestDTO);
        return success(response);

    } catch (err) {
        return failed(err, '404');
    }
};

export const getParents = async () => {
    try {
        const parents = await parentRepo.findAll();
        const parentDTOs: ParentResponseDTO[] = parents.map(parent => convertToDTO(parent));
        return success(parentDTOs);

    } catch (err) {
        return failed(err, '404');
    }
};

export const getParentById = async (id: number) => {
    try {
        //TODO get user with role from userRepo
        //TODO get names with origins and meaning from nameRepo. 
        const response = await parentRepo.findOneByID(id);

        if (!response) {
            return failed(invalidIdError, await generateStatusCode(invalidIdError.message));
        }

        return success(response);

    } catch (err) {
        return failed(err, '404');
    }
};

export const updateParent = async (parentDTO: ParentRequestDTO) => {
    try {
        const response = await parentRepo.save(parentDTO);
        return success(response);

    } catch (err) {
        return failed(err, '404');
    }
};

export const deleteParent = async (parentId: number) => {
    try {
        const parentDB = await parentRepo.findOneByID(parentId);

        if (!parentDB) {
            return failed(invalidIdError, await generateStatusCode(invalidIdError.message));
        }
        const response = await parentRepo.remove(parentDB);
        return success(response);

    } catch (err) {
        return failed(err, '404');
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
        names: parent.names,
        families: parent.families,
        location: parent.location
    };
    return dto;
};

function success(response: Parent | ParentResponseDTO[]): Result<ApiResponse, BaseError> {
    if (Array.isArray(response)) {
      return { success: true, result: { data: response } };
    } else {
      return { success: true, result: { data: convertToDTO(response) } };
    }
  }