import { parentRepo as familyRepo } from '../Repositories/familyRepository';
import { FamilyRequestDTO, FamilyResponseDTO } from '../DTO/familyDTO';
import { Family } from '../Entities/Family';
import { BaseError } from '../Utils/BaseError';
import { Result, ApiResponse, failed, generateStatusCode, invalidIdError } from '../Utils/errorHandler';

export const createFamily = async (familyRequestDTO: FamilyRequestDTO): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const response = await familyRepo.save(familyRequestDTO);
        return success(response);

    } catch (err) {
        //TODO Add custom message for each endpoint
        //TODO Add dynamic statuscode from the ErrorType.
        return failed(err, '404');
    }
};

export const getFamilies = async (): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const families = await familyRepo.findAll();
        const familyDTOs: FamilyResponseDTO[] = families.map(family => convertToDTO(family));
        return success(familyDTOs);

    } catch (err) {
        //TODO Add custom message for each endpoint
        //TODO Add dynamic statuscode from the ErrorType.
        return failed(err, '404');
    }
};

export const getFamilyById = async (id: number) => {
    try {
        const response = await familyRepo.findOneByID(id);
        if (!response) {
            return failed(invalidIdError('family'), await generateStatusCode(invalidIdError('family').message));
        }
        return success(response);

    } catch (err) {
        //TODO Add custom message for each endpoint
        //TODO Add dynamic statuscode from the ErrorType.
        return failed(err, '404');
    }
};

export const updateFamily = async (familyDTO: FamilyRequestDTO): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const response = await familyRepo.save(familyDTO);
        return success(response);

    } catch (err) {
        //TODO Add custom message for each endpoint
        //TODO Add dynamic statuscode from the ErrorType.
        return failed(err, '404');
    }
};

export const deleteFamily = async (parentId: number): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const familyDB = await familyRepo.findOneByID(parentId);

        if (!familyDB) {
            return failed(invalidIdError('family'), await generateStatusCode(invalidIdError('family').message));
        }
        const response = await familyRepo.remove(familyDB);
        return success(response);

    } catch (err) {
        //TODO Add custom message for each endpoint
        //TODO Add dynamic statuscode from the ErrorType.
        return failed(err, '404');
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
//TODO Disse 2 kunne godt ligge i ErrorHandler, men de skal tage imod generic objects, så de er dynamiske. 
function success(response: Family | FamilyResponseDTO[]): Result<ApiResponse, BaseError> {
    if (Array.isArray(response)) {
        return { success: true, result: { data: response } };
    } else {
        return { success: true, result: { data: convertToDTO(response) } };
    }
}