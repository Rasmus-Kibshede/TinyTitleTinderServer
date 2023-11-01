import { OriginRequestDTO, OriginResponseDTO } from '../DTO/originDTO';
import { Origin } from '../Entities/Origin';
import { originRepo } from '../Repositories/originRepository';

export const createOrigin = async (OriginRequestDTO: OriginRequestDTO) => {
    try {
        const save = await originRepo.save(OriginRequestDTO);
        return convertToDTO(save);
    } catch (error) {
        return error.message === 'Couldn\'t find name!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
    }
};

export const getOriginByID = async (id: number) => {
    try {

        const response = await originRepo.findOneByID(id);

        if (!response) {
            return { err: 'Invalid ID' };
        }

        return convertToDTO(response);
    } catch (error) {
        return error.message === 'Couldn\'t find name!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
    }
};

export const getOrigins = async () => {
    try {
        const origins = await originRepo.findAll();
        const originDTOs: OriginResponseDTO[] = origins.map((origin) => convertToDTO(origin));

        return originDTOs;
    } catch (error) {
        return error.message === 'Couldn\'t find any names!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
    }
};

export const updateOrigin = async (originRequestDTO: OriginRequestDTO) => {
    try {
        if (!originRequestDTO) {
            return { err: 'Invalid originDTO' };
        }

        const response = await originRepo.save(originRequestDTO);

        return convertToDTO(response);
    } catch (error) {
        return error.message === 'Couldn\'t find name!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
    }
};

export const deleteOriginByID = async (id: number) => {
    try {
        if (!id) {
            return { err: 'Invalid ID' };
        }

        const response = await originRepo.findOneByID(id);

        if (!response) {
            return { err: 'Invalid Origin' };
        }

        const remove = await originRepo.remove(response);

        return convertToDTO(remove);
    } catch (error) {
        return error.message === 'Couldn\'t find name!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
    }
};

const convertToDTO = (origin: Origin) => {
    const dto: OriginResponseDTO = {
        region: origin.region,
        religion: origin.religion,
        description: origin.description,
        names: origin.names,
    };
    return dto;
};