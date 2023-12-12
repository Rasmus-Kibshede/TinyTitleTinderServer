import { NameRequestDTO, NameResponseDTO } from '../DTO/nameDTO';
import { OriginResponseDTO } from '../DTO/originDTO';
// import { Name } from '../Entities/Mysql/Name';
import { failed, success } from '../Utils/errorHandler';
import { DefinitionResponseDTO } from '../DTO/definitionDTO';
import { nameRepository } from '../Repositories/repositoryHandler';
import { nameRepo } from '../Repositories/Mysql/nameRepository';
import { Name } from '../Entities/Mysql/Name';

export const createName = async (nameRequestDTO: NameRequestDTO) => {
  try {
    const response = await nameRepository()?.createOneName(nameRequestDTO);
    if (!response) {
      return failed('name');
    }

    return success(response);
  } catch (err) {
    return failed(err);
  }
};

export const getNameByID = async (id: number) => {
  try {
    const response = await nameRepo.findOneByID(id);

    if (!response) {
      return failed('name');
    }

    return success(response);
  } catch (err) {
    return failed(err);
  }
};

export const getNameByNameSuggestName = async (name: string) => {
try {
  const response = await nameRepo.findOneByName(name);
  if(!response){
    return failed(new Error('No such name'));
  }

   return success(convertToDTO(response));
  } catch (err) {
    return failed(err);
  }
};

export const getNames = async () => {
  try {
    const names = await nameRepo.findAll();
    const nameDTOs: NameResponseDTO[] = names.map((name: Name) => convertToDTO(name));

    return success(nameDTOs);
  } catch (err) {
    return failed(err);
  }
};

export const getNamesByParentId = async (parentId: number, isLiked: string) => {
  try {
    let response;
    if (isLiked === 'true') {
      response = await nameRepo.findNamesByParentId(parentId);
    } else if (isLiked === 'false') {
      response = await nameRepo.findDislikedNamesByParentId(parentId);
    } else {
      return failed('isLiked');
    }

    const nameDTOs: NameResponseDTO[] = RemoveDublicates(response);

    return success(nameDTOs);
  } catch (err) {
    return failed(err);
  }
};

export const getParentlessNames = async (parentId: number) => {
  try {
    const response = await nameRepo.findParentlessNames(parentId);
    const nameDTOs: NameResponseDTO[] = RemoveDublicates(response);
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
    return failed(err);
  }
};

export const deleteNameByID = async (id: number) => {
  try {
    const { affected } = await nameRepo.delete(id);

    if (affected === 0) {
      return failed('name');
    }

    return success('Name deleted');
  } catch (err) {
    return failed(err);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RemoveDublicates = (response: any) => {
  const originDTOs: OriginResponseDTO[] = response[1].map(
    (origin: OriginStoredProcedure) => convertToOriginDTO(origin)
  );
  const nameDTOs: NameResponseDTO[] = response[0].map(
    (name: NameStoredProcedure) =>
      convertToDTOSpecial(
        name,
        originDTOs.filter((origin) => origin.nameId === name.name_suggest_id)
      )
  );
  return nameDTOs;
};

const convertToDTO = (name: Name) => {
  const dto: NameResponseDTO = {
    nameSuggestId: name.nameSuggestId,
    nameSuggestName: name.nameSuggestName,
    gender: name.gender,
    popularity: Number(name.popularity),
    nameDays: name.nameDays,
    namesakes: name.namesakes,
    origins: name.origins,
  };
  return dto;
};

const convertToDTOSpecial = (
  name: NameStoredProcedure,
  origins: OriginResponseDTO[]
) => {
  const nameDTO: NameResponseDTO = {
    nameSuggestId: name.name_suggest_id,
    nameSuggestName: name.name_suggest_name,
    gender: name.gender,
    popularity: name.popularity,
    nameDays: name.name_days,
    namesakes: name.namesakes,
    origins: origins,
  };
  return nameDTO;
};

const convertToOriginDTO = (origin: OriginStoredProcedure) => {
  const definition: DefinitionResponseDTO = {
    definitionId: origin.definition_id,
    meaning: origin.meaning,
  };
  const originDTO: OriginResponseDTO = {
    originId: origin.origin_id,
    region: origin.region,
    religion: origin.region,
    description: origin.description,
    definition: definition,
    nameId: origin.fk_name_suggest_id,
  };
  return originDTO;
};

// eslint-disable-next-line camelcase
class NameStoredProcedure {
  // eslint-disable-next-line camelcase
  name_suggest_id: number;
  // eslint-disable-next-line camelcase
  name_suggest_name: string;
  gender: string;
  popularity: number;
  // eslint-disable-next-line camelcase
  name_days: string;
  namesakes: string;
  // eslint-disable-next-line camelcase
  origin_id: number;
  region: string;
  religion: string;
  description: string;
  meaning: string;
}

class OriginStoredProcedure {
  // eslint-disable-next-line camelcase
  origin_id: number;
  region: string;
  religion: string;
  description: string;
  // eslint-disable-next-line camelcase
  definition_id: number;
  meaning: string;
  // eslint-disable-next-line camelcase
  fk_name_suggest_id: number;
}
