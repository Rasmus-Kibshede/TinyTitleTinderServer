import { NameRequestDTO, NameResponseDTO } from '../DTO/nameDTO';
import { Name } from '../Entities/Name';
import { nameRepo } from '../Repositories/nameRepository';

export const createName = async (nameRequestDTO: NameRequestDTO) => {
  try {  
    if (!nameRequestDTO) {
      return { err: 'Invalid nameDTO' };
    }

    const save = await nameRepo.save(nameRequestDTO);

    return convertToDTO(save);
  } catch (error) {
    // Temporary solution before implementing generic validation on unique constraints
   /* if ( error instanceof Error && 'code' in error && error.code === 'ER_DUP_ENTRY' ) {
      return { status: 409, error: 'Name already exists' };
    } else {
      return { status: 400, error: 'Name not saved' };
    }*/    
    return error.message === 'Couldn\'t find any name!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
  }
};

export const getNameByID = async (id: number) => {
  try {
    const response = await nameRepo.findOneByID(id);

    if (!response) {
      return { err: 'No name with that id' };
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

export const updateName = async (nameRequestDTO: NameRequestDTO) => {
  try {
    const response = await nameRepo.save(nameRequestDTO);
    return convertToDTO(response);

  } catch (error) {
    // Temporary solution before implementing generic validation on unique constraints
    /*if (error instanceof Error && 'code' in error && error.code === 'ER_DUP_ENTRY' ) {
      return { status: 409, error: 'Name already exists' };
    } else {
      return { status: 400, error };
    }*/  
    return error.message === 'Couldn\'t find any parents!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
  }
};

export const deleteNameByID = async (id: number) => {
  try {
    const response = await nameRepo.findOneByID(id);

    if (!response) {
      return { err: 'Name not found' };
    }

    return (
      convertToDTO(await nameRepo.remove(response)) || {err: 'Name not deleted',}
    );
  } catch (error) {
    return error.message === 'Couldn\'t find name!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
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
  };

  return dto;
};
