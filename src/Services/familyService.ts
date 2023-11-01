import { parentRepo as familyRepo } from '../Repositories/familyRepository';
import { FamilyRequestDTO, FamilyResponseDTO } from '../DTO/familyDTO';
import { Family } from '../Entities/Family';

export const createFamily = async (familyRequestDTO: FamilyRequestDTO) => {
    try {
        const response = await familyRepo.save(familyRequestDTO);
        return convertToDTO(response);

    } catch (error) {
        return error.message === 'Something went wrong!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
    }
};

export const getFamilies = async () => {
    try {
        const families = await familyRepo.findAll();
        const familyDTOs: FamilyRequestDTO[] = families.map(family => convertToDTO(family));
        return familyDTOs;

    } catch (error) {
        return error.message === 'Couldn\'t find any Families!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
    }
};

export const getFamilyById = async (id: number) => {
    try {
        const response = await familyRepo.findOneByID(id);
        
        if (!response) {
            return { err: 'Invalid Family' };
        }

        return convertToDTO(response);

    } catch (error) {
        return error.message === 'Couldn\'t find a Family with that id!' ? { err: error.message } : { err: 'Something terrible went wrong!- we are working on it!' };
    }
};

export const updateFamily = async (familyDTO: FamilyRequestDTO) => {
    try {
        if (!familyDTO) {
            return { err: 'Invalid Family DTO!' };
        }
        const response = await familyRepo.save(familyDTO);
        return convertToDTO(response);

    } catch (error) {
        return error.message === 'Couldn\'t find any Family!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
    }
};

export const deleteFamily = async (parentId: number) => {
    try {
        const familyDB = await familyRepo.findOneByID(parentId);

        if (!familyDB) {
            return { err: 'Invalid Family' };
        }
        const response = await familyRepo.remove(familyDB);
        return convertToDTO(response);

    } catch (error) {
        return error.message === 'Couldn\'t find any Family!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
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