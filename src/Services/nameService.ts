import { NameRequestDTO, NameResponseDTO } from '../DTO/nameDTO';
import { Name } from '../Entities/Name';
import { nameRepo } from '../Repositories/nameRepository';

export const createName = async (nameRequestDTO: NameRequestDTO) => {
    try {
      if (!nameRequestDTO) {
        return { err: 'Invalid nameDTO' };
      }

      const save = await nameRepo.save(nameRequestDTO) as Name;

      return convertToDTO(save);
    } catch(error: unknown) {
      // Temporary solution before implementing generic validation on unique constraints
      if (error instanceof Error && 'code' in error && error.code === 'ER_DUP_ENTRY') {
        return { status: 409, error: 'Name already exists' };
    } else {
        return { status: 400, error: 'Name not saved' };
    }
  }
};

export const getNameByID = async (id: number) => {
  try {
    if (!id) {
      return { err: 'Invalid ID' };
    }
    const response = await nameRepo.findOneByID(id);

    if (!response) {
      return { err: 'Invalid ID' };
    }
    
    return convertToDTO(response);

  } catch (error) {
    return error.message === 'Couldn\'t find name!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
  }
};

export const getNames = async () => {
  try {
    const names = await nameRepo.findAll();
    const nameDTOs: NameResponseDTO[] = names.map((name) => convertToDTO(name));
    return nameDTOs;

  } catch (error) {
      return error.message === 'Couldn\'t find any names!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
  }

};

export const updateName = async (nameRequestDTO: NameRequestDTO, name: string) => {
  try {
    if (!nameRequestDTO) {
      return { err: 'Invalid nameDTO' };
    }
  
    const response = await nameRepo.findOneByName(name);
  
    if (!response) {
      return { err: 'Name not found' };
    }
  
    response.nameSuggestName = nameRequestDTO.nameSuggestName;
  
    // Temporary solution before implementing generic validation on unique constraints
    const nameValidation = await nameRepo.findOne({ where: { nameSuggestName: nameRequestDTO.nameSuggestName } });
    if (nameValidation) {
      return { err: 'Name already exists' };
    }
  
    const savedName = await nameRepo.save(response);
  
    if (!savedName) {
      return { err: 'Name could not be saved' };
    }
  
    return nameRequestDTO;
  } catch (error) {
    return error.message === 'Couldn\'t find name!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
  }
  
};

export const deleteNameByID = async (id: number) => {
  try {
    if (!id) {
      return { err: 'Invalid ID' };
    }

    const response = await nameRepo.findOneByID(id);

    if (!response) {
      return { err: 'Name not found' };
    }

    return (
      convertToDTO(await nameRepo.remove(response)) || { err: 'Name not deleted' }
    );
  } catch (error) {
    return error.message === 'Couldn\'t find name!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
  }
};

const convertToDTO = (name: Name) => {
  const dto: NameResponseDTO = {
    nameSuggestName: name.nameSuggestName,
    gender: name.gender,
    nameDays: name.nameDays,
    namesakes: name.namesakes,
  };

  return dto;
};
