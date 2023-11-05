import { OriginRequestDTO, OriginResponseDTO } from '../DTO/originDTO';
import { Origin } from '../Entities/Origin';
import { originRepo } from '../Repositories/originRepository';
import { Result, ApiResponse, failed } from '../Utils/errorHandler';
import { BaseError } from '../Utils/BaseError';

export const createOrigin = async (OriginRequestDTO: OriginRequestDTO): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const response = await originRepo.save(OriginRequestDTO);
        return success(response);
    } catch (err) {
        return failed(err, '404');
    }
};

export const getOriginByID = async (id: number): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const response = await originRepo.findOneByID(id);
        if (!response) {
            return failed(new Error('No origin with that id'), '404');
        }
        return success(response);
    } catch (err) {
        return failed(err, '404');
    }
};

export const getOrigins = async (): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const origins = await originRepo.findAll();
        const originDTOs: OriginResponseDTO[] = origins.map((origin) => convertToDTO(origin));
        return success(originDTOs);
    } catch (err) {
        return failed(err, '404');
    }
};

export const updateOrigin = async (originRequestDTO: OriginRequestDTO): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const response = await originRepo.save(originRequestDTO);
        return success(response);
    } catch (err) {
        return failed(err, '404');
    }
};

export const deleteOriginByID = async (id: number): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const response = await originRepo.findOneByID(id);
        if (!response) {
            return failed(new Error('No name with that id'), '404');
        }
        const remove = await originRepo.remove(response);
        return success(remove);
    } catch (err) {
        return failed(err, '404');
    }
};

const convertToDTO = (origin: Origin) => {
    const dto: OriginResponseDTO = {
        originId: origin.originId,
        region: origin.region,
        religion: origin.religion,
        description: origin.description,
        names: origin.names,
    };
    return dto;
};

function success(response: Origin | OriginResponseDTO[]): Result<ApiResponse, BaseError> {
    if (Array.isArray(response)) {
      return { success: true, result: { data: response } };
    } else {
      return { success: true, result: { data: convertToDTO(response) } };
    }
  }