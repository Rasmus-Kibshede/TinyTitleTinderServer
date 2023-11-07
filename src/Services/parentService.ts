import { parentRepo } from '../Repositories/parentRepository';
import { Parent } from '../Entities/Parent';
import { ParentRequestDTO, ParentResponseDTO } from '../DTO/parentDTO';
import { Result, ApiResponse, failed, success } from '../Utils/errorHandler';
import { BaseError } from '../Utils/BaseError';

export const createParent = async (parentRequestDTO: ParentRequestDTO): Promise<Result<ApiResponse, BaseError>>  => {
    try {
        const response = await parentRepo.save(parentRequestDTO);
        return success(convertToDTO(response));

    } catch (err) {
        return failed(err);
    }
};

export const getParents = async (): Promise<Result<ApiResponse, BaseError>>  => {
    try {
        const parents = await parentRepo.findAll();
        const parentDTOs: ParentResponseDTO[] = parents.map(parent => convertToDTO(parent));
        return success(parentDTOs);

    } catch (err) {
        return failed(err);
    }
};

export const getParentById = async (id: number): Promise<Result<ApiResponse, BaseError>>  => {
    try {
        //TODO get user with role from userRepo
        //TODO get names with origins and meaning from nameRepo. 
        const response = await parentRepo.findOneByID(id);

        if (!response) {
            return failed('parent');
        }

        return success(convertToDTO(response));

    } catch (err) {
        return failed(err);
    }
};

export const updateParent = async (parentDTO: ParentRequestDTO): Promise<Result<ApiResponse, BaseError>>  => {
    try {
        const response = await parentRepo.save(parentDTO);
        return success(convertToDTO(response));

    } catch (err) {
        return failed(err);
    }
};

export const deleteParent = async (parentId: number): Promise<Result<ApiResponse, BaseError>>  => {
    try {
        const parentDB = await parentRepo.findOneByID(parentId);

        if (!parentDB) {
            return failed('parent');
        }
        const response = await parentRepo.remove(parentDB);
        return success(convertToDTO(response));

    } catch (err) {
        return failed(err);
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