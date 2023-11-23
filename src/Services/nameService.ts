import { NameRequestDTO, NameResponseDTO } from '../DTO/nameDTO';
import { OriginResponseDTO } from '../DTO/originDTO';
import { Name } from '../Entities/Name';
import { nameRepo } from '../Repositories/nameRepository';
import { failed, success } from '../Utils/errorHandler';
import { DefinitionResponseDTO } from '../DTO/definitionDTO';

export const createName = async (nameRequestDTO: NameRequestDTO) => {
  try {
    const response = await nameRepo.save(nameRequestDTO);

    return success(convertToDTO(response));
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

export const getNamesByParentId = async (parentId: number, isLiked: boolean) => {
  try {
    let response;
    if(isLiked){
       response = await nameRepo.findNamesByParentId(parentId);
    }else if (isLiked === false){
      response = await nameRepo.findDislikedNamesByParentId(parentId);
    } else
    response = await nameRepo.findNamesNoRelation();
    const originDTOs: OriginResponseDTO[] = response[1].map((origin: OriginStoredProcedure) => convertToOriginDTO(origin));
    const nameDTOs: NameResponseDTO[] = response[0].map((name: NameStoredProcedure) => convertToDTOSpecial(name,
      originDTOs.filter(origin => origin.nameId === name.name_suggest_id)));

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
    popularity: Number(name.popularity),
    nameDays: name.nameDays,
    namesakes: name.namesakes,
    origins: name.origins,
  };
  return dto;
};

const convertToDTOSpecial = (name: NameStoredProcedure, origins: OriginResponseDTO[]) => {
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
    meaning: origin.meaning
  };
  const originDTO: OriginResponseDTO = {
    originId: origin.origin_id,
    region: origin.region,
    religion: origin.region,
    description: origin.description,
    definition: definition,
    nameId: origin.fk_name_suggest_id
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
