import { MeaningRequestDTO, MeaningResponseDTO } from '../DTO/meaningDTO';
import { Meaning } from '../Entities/Meaning';
import { meaningRepo } from '../Repositories/meaningRepository';
import { BaseError } from '../Utils/BaseError';
import { Result, ApiResponse, failed } from '../Utils/errorHandler';

export const createMeaning = async (meaningRequestDTO: MeaningRequestDTO): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const response = await meaningRepo.save(meaningRequestDTO);
        return success(response);

    } catch (err) {
        // Temporary solution before implementing generic validation on unique constraints
        return failed(err);
    }
};

export const getMeanings = async (): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const meanings = await meaningRepo.findAll();
        const meaningDTOs: MeaningResponseDTO[] = meanings.map(meaning => convertToDTO(meaning));
        return success(meaningDTOs);

    } catch (err) {
        return failed(err);
    }
};

export const getMeaningById = async (id: number): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const response = await meaningRepo.findOneByID(id);

        if (!response) {
            return failed('meaning');
        }

        return success(response);

    } catch (err) {
        return failed(err);
    }
};

export const updateMeaning = async (meaningRequestDTO: MeaningRequestDTO): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const response = await meaningRepo.save(meaningRequestDTO);
        return success(response);

    } catch (err) {
        // Temporary solution before implementing generic validation on unique constraints
        return failed(err);
    }
};

export const deleteMeaning = async (meaningId: number): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const meaningDB = await meaningRepo.findOneByID(meaningId);

        if (!meaningDB) {
            return failed('meaning');
        }

        const response = await meaningRepo.remove(meaningDB);
        return success(response);

    } catch (err) {
        return failed(err);
    }
};

const convertToDTO = (meaning: Meaning) => {
    const dto: MeaningResponseDTO = {
        meaningId: meaning.meaningId,
        definition: meaning.definition,
        names: meaning.names
    };
    return dto;
};

function success(response: Meaning | MeaningResponseDTO[]): Result<ApiResponse, BaseError> {
    if (Array.isArray(response)) {
        return { success: true, result: { data: response } };
    } else {
        return { success: true, result: { data: convertToDTO(response) } };
    }
}