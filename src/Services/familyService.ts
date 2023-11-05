import { parentRepo as familyRepo } from '../Repositories/familyRepository';
import { FamilyRequestDTO, FamilyResponseDTO } from '../DTO/familyDTO';
import { Family } from '../Entities/Family';
import { BaseError } from '../Utils/BaseError';
import { Result, ApiResponse, ensureError } from '../Utils/errorHandler';

export const createFamily = async (familyRequestDTO: FamilyRequestDTO): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const response = await familyRepo.save(familyRequestDTO);
        return { success: true, result:{data: convertToDTO(response)}};

    } catch (err) {
        //TODO Add custom message for each endpoint
        //TODO Add dynamic statuscode from the ErrorType.
        const error = ensureError(err);
        return { success: false, error: new BaseError('Could not create address', {
            error: error, 
            statusCode: 404
        })};
    }
};

export const getFamilies = async (): Promise<Result<ApiResponse, BaseError>>  => {
    try {
        const families = await familyRepo.findAll();
        const familyDTOs: FamilyRequestDTO[] = families.map(family => convertToDTO(family));
        return { success: true, result:{data: familyDTOs}};

    } catch (err) {
        //TODO Add custom message for each endpoint
        //TODO Add dynamic statuscode from the ErrorType.
        const error = ensureError(err);
        return { success: false, error: new BaseError('Could not create address', {
            error: error, 
            statusCode: 404
        })};
    }
};

export const getFamilyById = async (id: number) => {
    try {
        const response = await familyRepo.findOneByID(id);
        
        if (!response) {
            return { err: 'Invalid Family' };
        }

        return { success: true, result:{data: convertToDTO(response)}};

    } catch (err) {
        //TODO Add custom message for each endpoint
        //TODO Add dynamic statuscode from the ErrorType.
        const error = ensureError(err);
        return { success: false, error: new BaseError('Could not create address', {
            error: error, 
            statusCode: 404
        })};
    }
};

export const updateFamily = async (familyDTO: FamilyRequestDTO): Promise<Result<ApiResponse, BaseError>>  => {
    try {
        const response = await familyRepo.save(familyDTO);
        return { success: true, result:{data: convertToDTO(response)}};

    } catch (err) {
        //TODO Add custom message for each endpoint
        //TODO Add dynamic statuscode from the ErrorType.
        const error = ensureError(err);
        return { success: false, error: new BaseError('Could not create address', {
            error: error, 
            statusCode: 404
        })};
    }
};

export const deleteFamily = async (parentId: number): Promise<Result<ApiResponse, BaseError>>  => {
    try {
        const familyDB = await familyRepo.findOneByID(parentId);

        if (!familyDB) {
            return { success: false, error: new BaseError('Could not get address', {
                error: new Error('Couldent find address with that id.'), 
                statusCode: 404
            })};
        }
        const response = await familyRepo.remove(familyDB);
        return { success: true, result:{data: convertToDTO(response)}};

    } catch (err) {
        //TODO Add custom message for each endpoint
        //TODO Add dynamic statuscode from the ErrorType.
        const error = ensureError(err);
        return { success: false, error: new BaseError('Could not create address', {
            error: error, 
            statusCode: 404
        })};
    }
};

export const convertToDTO = (family: Family) => {
    const dto: FamilyResponseDTO = {
        familyId: family.familyId,
        familyName: family.familyName,
        parents: family.parents
    };
    return dto;
};