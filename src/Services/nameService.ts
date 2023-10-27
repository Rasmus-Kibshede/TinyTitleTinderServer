import { NameRequestDTO, NameResponseDTO } from '../DTO/nameDTO';
import { Name } from '../Entities/Name';
import { nameRepo } from '../Repositories/nameRepository';

export const createName = async (nameRequestDTO: NameRequestDTO) => {
  const save = await nameRepo.save(nameRequestDTO);
  return convertToDTO(save);
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


// TODO: Fix any type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateName = async (nameDTO: NameRequestDTO, name: any) => {
  if (!nameDTO) {
    return { err: 'invalid nameDTO' };
  }

  const nameDB = (await nameRepo.findOneByName(name)) as Name;

  if (!nameDB) {
    return { err: 'Name not found' };
  }

  nameDB.nameSuggestName = nameDTO.name;

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
    name: name.nameSuggestName,
    gender: name.gender,
    popularity: name.popularity,
    nameDays: name.nameDays,
    namesakes: name.namesakes,
  };
  return dto;
};
