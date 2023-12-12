import { parentRepo as familyRepo } from '../Repositories/Mysql/familyRepository';
import { FamilyRequestDTO, FamilyResponseDTO } from '../DTO/familyDTO';
import { Family } from '../Entities/Mysql/Family';
import { failed, success } from '../Utils/errorHandler';

export const createFamily = async (familyRequestDTO: FamilyRequestDTO) => {
    try {
        const response = await familyRepo.save(familyRequestDTO);
        return success(convertToDTO(response));

    } catch (err) {
        return failed(err);
    }
};

export const getFamilies = async () => {
    try {
        const families = await familyRepo.findAll();
        const familyDTOs: FamilyResponseDTO[] = families.map((family: Family) => convertToDTO(family));
        return success(familyDTOs);

    } catch (err) {
        return failed(err);
    }
};

export const getFamilyById = async (id: number) => {
    try {    
        const response = await familyRepo.findOneByID(id);
        if (!response) {
            return failed('family');
        }
        return success(convertToDTO(response));

    } catch (err) {
        return failed(err);
    }
};

export const updateFamily = async (familyDTO: FamilyRequestDTO) => {
    try {
        const response = await familyRepo.save(familyDTO);
        return success(convertToDTO(response));

    } catch (err) {
        return failed(err);
    }
};

export const deleteFamily = async (parentId: number) => {
    try {
        const familyDB = await familyRepo.findOneByID(parentId);

        if (!familyDB) {
            return failed('family');
        }
        const response = await familyRepo.remove(familyDB);
        return success(convertToDTO(response));

    } catch (err) {
        return failed(err);
    }
};

export const convertToDTO = (family: Family) => {
    const dto: FamilyResponseDTO = {
        familyId: family.familyId,
        familyName: family.familyName,
    };
    return dto;
};
