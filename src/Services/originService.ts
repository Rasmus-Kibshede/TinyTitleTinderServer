import { OriginRequestDTO, OriginResponseDTO } from '../DTO/originDTO';
import { Origin } from '../Entities/Mysql/Origin';
import { originRepo } from '../Repositories/Mysql/originRepository';
import { failed, success } from '../Utils/errorHandler';

export const createOrigin = async (OriginRequestDTO: OriginRequestDTO) => {
    try {
        const response = await originRepo.save(OriginRequestDTO);
        return success(convertToDTO(response));
    } catch (err) {
        return failed(err);
    }
};

export const getOriginByID = async (id: number) => {
    try {
        const response = await originRepo.findOneByID(id);
        if (!response) {
            return failed('origin');
        }
        return success(convertToDTO(response));
    } catch (err) {
        return failed(err);
    }
};

export const getOrigins = async () => {
    try {
        const origins = await originRepo.findAll();
        const originDTOs: OriginResponseDTO[] = origins.map((origin) => convertToDTO(origin));
        return success(originDTOs);
    } catch (err) {
        return failed(err);
    }
};

export const updateOrigin = async (originRequestDTO: OriginRequestDTO) => {
    try {
        const response = await originRepo.save(originRequestDTO);
        return success(convertToDTO(response));
    } catch (err) {
        return failed(err);
    }
};

export const deleteOriginByID = async (id: number) => {
    try {
        const response = await originRepo.findOneByID(id);
        if (!response) {
            return failed('origin');
        }
        const remove = await originRepo.remove(response);
        return success(convertToDTO(remove));
    } catch (err) {
        return failed(err);
    }
};

const convertToDTO = (origin: Origin) => {
    const dto: OriginResponseDTO = {
        originId: origin.originId,
        region: origin.region,
        religion: origin.religion,
        description: origin.description,
        definition: origin.definition,
    };
    return dto;
};