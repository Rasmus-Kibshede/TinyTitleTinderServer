import { MeaningRequestDTO, MeaningResponseDTO } from '../DTO/meaningDTO';
import { Meaning } from '../Entities/Meaning';
import { meaningRepo } from '../Repositories/meaningRepository';

export const createMeaning = async (meaningRequestDTO: MeaningRequestDTO) => {
    try {
        const save = await meaningRepo.save(meaningRequestDTO);
        return convertToDTO(save);

    } catch (error) {
        // Temporary solution before implementing generic validation on unique constraints
        if (error instanceof Error && 'code' in error && error.code === 'ER_DUP_ENTRY') {
            return error.message === 'Something went wrong!- we are working on it!' ? { err: error.message } : { err: 'Meaning already exists' };
        } else {
            return error.message === 'Couldn\'t find any meaning (with life)!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
        }
    }
};

export const getMeanings = async () => {
    try {
        const meanings = await meaningRepo.findAll();
        const meaningDTOs: MeaningResponseDTO[] = meanings.map(meaning => convertToDTO(meaning));
        return meaningDTOs;

    } catch (error) {
        return error.message === 'Couldn\'t find any meanings!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
    }
};

export const getMeaningById = async (id: number) => {
    try {
        const response = await meaningRepo.findOneByID(id);

        if (!response) {
            return { err: 'Invalid Meaning' };
        }

        return convertToDTO(response);

    } catch (error) {
        return error.message === 'Couldn\'t find a Meaning with that id!' ? { err: error.message } : { err: 'Something terrible went wrong!- we are working on it!' };
    }
};

export const updateMeaning = async (meaningRequestDTO: MeaningRequestDTO) => {
    try {
        if (!meaningRequestDTO) {
            return { err: 'Invalid Meaning DTO!' };
        }
        const response = await meaningRepo.save(meaningRequestDTO);
        return convertToDTO(response);

    } catch (error) {
        // Temporary solution before implementing generic validation on unique constraints
        if (error instanceof Error && 'code' in error && error.code === 'ER_DUP_ENTRY') {
            return error.message === 'Something went wrong!- we are working on it!' ? { err: error.message } : { err: 'Meaning already exists' };
        } else {
            return error.message === 'Couldn\'t find any meaning (with life)!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
        }
    }
};

export const deleteMeaning = async (meaningId: number) => {
    try {
        const meaningDB = await meaningRepo.findOneByID(meaningId);

        if (!meaningDB) {
            return { err: 'Invalid Meaning' };
        }

        const response = await meaningRepo.remove(meaningDB);
        return convertToDTO(response);

    } catch (error) {
        return error.message === 'Couldn\'t find any meaning!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
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