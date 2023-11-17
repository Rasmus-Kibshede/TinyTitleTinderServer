import { MeaningRequestDTO, MeaningResponseDTO } from '../DTO/meaningDTO';
import { Meaning } from '../Entities/Meaning';
import { meaningRepo } from '../Repositories/meaningRepository';
import { failed, success } from '../Utils/errorHandler';

export const createMeaning = async (meaningRequestDTO: MeaningRequestDTO) => {
    try {
        const response = await meaningRepo.save(meaningRequestDTO);
        return success(convertToDTO(response));

    } catch (err) {
        return failed(err);
    }
};

export const getMeanings = async () => {
    try {
        const meanings = await meaningRepo.findAll();
        const meaningDTOs: MeaningResponseDTO[] = meanings.map(meaning => convertToDTO(meaning));
        return success(meaningDTOs);

    } catch (err) {
        return failed(err);
    }
};

export const getMeaningById = async (id: number) => {
    try {
        const response = await meaningRepo.findOneByID(id);
        if (!response) {
            return failed('meaning');
        }
        return success(convertToDTO(response));

    } catch (err) {
        return failed(err);
    }
};

export const updateMeaning = async (meaningRequestDTO: MeaningRequestDTO) => {
    try {
        const response = await meaningRepo.save(meaningRequestDTO);
        return success(convertToDTO(response));

    } catch (err) {
        return failed(err);
    }
};

export const deleteMeaning = async (meaningId: number) => {
    try {
        const meaningDB = await meaningRepo.findOneByID(meaningId);
        if (!meaningDB) {
            return failed('meaning');
        }

        const response = await meaningRepo.remove(meaningDB);
        return success(convertToDTO(response));

    } catch (err) {
        return failed(err);
    }
};

const convertToDTO = (meaning: Meaning) => {
    const dto: MeaningResponseDTO = {
        meaningId: meaning.meaningId,
        definition: meaning.definition
    };
    return dto;
};