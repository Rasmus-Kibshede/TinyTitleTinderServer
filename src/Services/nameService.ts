import { NameRequestDTO, NameResponseDTO } from '../DTO/nameDTO';
import { Name } from '../Entities/Name';
import { nameRepo } from '../Repositories/nameRepository';
import { failed, success } from '../Utils/errorHandler';

export const createName = async (nameRequestDTO: NameRequestDTO) => {
  try {
    const response = await nameRepo.save(nameRequestDTO);

    return success(convertToDTO(response));
  } catch (err) {
    // Temporary solution before implementing generic validation on unique constraints
    return failed(err);
  }
};

export const getNameByID = async (id: number) => {
  try {
    const response = await nameRepo.findOneByID(id);

    if (!response) {
      return failed('name');
    }

    return success(convertToDTO(response));
  } catch (err) {
    return failed(err);
  }
};

export const getNames = async () => {
  try {
    const names = await nameRepo.findAll();
    const nameDTOs: NameResponseDTO[] = names.map((name) => convertToDTO(name));

    return success(nameDTOs);
  } catch (err) {
    return failed(err);
  }
};

export const updateName = async (nameRequestDTO: NameRequestDTO) => {
  try {
    const response = await nameRepo.save(nameRequestDTO);
    return success(convertToDTO(response));

  } catch (err) {
    // Temporary solution before implementing generic validation on unique constraints
    return failed(err);
  }
};

export const deleteNameByID = async (id: number) => {
  try {
    const nameDB = await nameRepo.findOneByID(id);

    if (!nameDB) {
      return failed('name');
    }
    const response = await nameRepo.remove(nameDB);
    return success(convertToDTO(response));
  } catch (err) {
    return failed(err);
  }
};

const convertToDTO = (name: Name) => {
  const dto: NameResponseDTO = {
    nameSuggestId: name.nameSuggestId,
    nameSuggestName: name.nameSuggestName,
    gender: name.gender,
    nameDays: name.nameDays,
    namesakes: name.namesakes,
    origins: name.origins,
    meanings: name.meanings,
  };

  return dto;
};
