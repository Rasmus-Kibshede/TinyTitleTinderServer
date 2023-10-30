import { NameRequestDTO, NameResponseDTO } from '../DTO/nameDTO';
import { Name } from '../Entities/Name';
import { nameRepo } from '../Repositories/nameRepository';

//TODO: Validation of unique name
export const createName = async (nameRequestDTO: NameRequestDTO) => {
    try {
      const save = await nameRepo.save(nameRequestDTO) as Name;

      return convertToDTO(save);
    } catch(error: unknown) {
      if (error instanceof Error && 'code' in error && error.code === 'ER_DUP_ENTRY') {
        const response = { err: 'Duplicate entry of name' };
        return { status: 400, response };
    } else {
        const response = { err: 'Name not saved' };
        return { status: 400, response };
    }
  }
};

export const getNameByID = async (id: number) => {
  const response = await nameRepo.findOneByID(id);

  if (!response) {
    return { err: 'Name not found' };
  }

  return convertToDTO(response);
};

export const getNames = async () => {
  const names = await nameRepo.findAll();
  const nameDTOs: NameResponseDTO[] = names.map((name) => convertToDTO(name));
  return nameDTOs;
};

export const updateName = async (nameDTO: NameRequestDTO, name: string) => {
  if (!nameDTO) {
    return { err: 'invalid nameDTO' };
  }

  const nameDB = (await nameRepo.findOneByName(name)) as Name;

  if (!nameDB) {
    return { err: 'Name not found' };
  }

  nameDB.nameSuggestName = nameDTO.nameSuggestName;

  const savedName = await nameRepo.save(nameDB);

  if (!savedName) {
    return { err: 'Name could not be saved' };
  }

  return savedName;
};

export const deleteNameByID = async (id: number) => {
  const response = await nameRepo.findOneByID(id);

  if (!response) {
    return { err: 'Name not found' };
  }

  return (
    convertToDTO(await nameRepo.remove(response)) || { err: 'Name not deleted' }
  );
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
