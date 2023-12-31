import { parentRepo } from '../Repositories/Mysql/parentRepository';
import { Parent } from '../Entities/Mysql/Parent';
import { ParentRequestDTO, ParentResponseDTO } from '../DTO/parentDTO';
import { failed, success } from '../Utils/errorHandler';
import { NameResponseDTO } from '../DTO/nameDTO';

export const createParent = async (parentRequestDTO: ParentRequestDTO) => {
  try {
    const response = await parentRepo.save(parentRequestDTO);
    return success(convertToDTO(response));
  } catch (err) {
    return failed(err);
  }
};

export const getParents = async () => {
  try {
    const parents = await parentRepo.findAll();
    const parentDTOs: ParentResponseDTO[] = parents.map((parent) =>
      convertToDTO(parent)
    );
    return success(parentDTOs);
  } catch (err) {
    return failed(err);
  }
};

export const getParentById = async (id: number) => {
  try {
    const response = await parentRepo.findOneByID(id);
    if (!response) {
      return failed('parent');
    }

    return success(convertToDTO(response));
  } catch (err) {
    return failed(err);
  }
};

export const updateParent = async (parentDTO: ParentRequestDTO) => {
  try {
    
    const response = await parentRepo.save(parentDTO);

    return success(convertToDTO(response));
  } catch (err) {
    return failed(err);
  }
};

export const deleteParent = async (parentId: number) => {
  try {
    const parentDB = await parentRepo.findOneByID(parentId);

    if (!parentDB) {
      return failed('parent');
    }
    const response = await parentRepo.remove(parentDB);
    return success(convertToDTO(response));
  } catch (err) {
    return failed(err);
  }
};

export const updateTablesForName = async (
  parentId: number,
  likedNames: number[],
  dislikedNames: number[]
) => {
  try {
    await parentRepo.saveLikedDislikedNames(
      parentId,
      likedNames,
      dislikedNames
    );

    return success(`Updated liked and disliked names for parent with id ${parentId}`);

  } catch (err) {
    return failed(err);
  }
};

export const convertToDTO = (parent: Parent) => {
  const dto: ParentResponseDTO = {
    parentId: parent.parentId,
    age: parent.age,
    gender: parent.gender,
    firstName: parent.firstName,
    lastName: parent.lastName,
    likedNames: parent.likedNames as NameResponseDTO[],
    dislikedNames: parent.dislikedNames as NameResponseDTO[],
    families: parent.families,
    address: parent.address,
  };
  return dto;
};
