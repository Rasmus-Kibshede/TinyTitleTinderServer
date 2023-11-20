import { NameRequestDTO, NameResponseDTO } from '../DTO/nameDTO';
import { OriginResponseDTO } from '../DTO/originDTO';
import { Name } from '../Entities/Name';
import { nameRepo } from '../Repositories/nameRepository';
import { failed, success } from '../Utils/errorHandler';
import { MeaningResponseDTO } from '../DTO/meaningDTO';

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

export const getNamesByParentId = async (parentId: number) => {
  try {
    const response = await nameRepo.findNamesByParentId(parentId);
    const originDTOs: OriginResponseDTO[] = response[1].map((origin: OriginStoredProcedure) => convertToOriginDTO(origin));
    const meaningDTOs: MeaningResponseDTO[] = response[2].map((meaning: MeaningStoredProcedure) => convertToMeaningDTO(meaning));
    const nameDTOs: NameResponseDTO[] = response[0].map((name: NameStoredProcedure) => convertToDTOSpecial(name, 
      originDTOs.filter(origin => origin.nameId === name.name_suggest_id), 
      meaningDTOs.filter(meaning => meaning.nameId === name.name_suggest_id)));

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
    meanings: name.meanings,
  };
  return dto;
};

const convertToDTOSpecial = (name: NameStoredProcedure, origins: OriginResponseDTO[], meanings: MeaningResponseDTO[]) => {
  const nameDTO: NameResponseDTO = {
    nameSuggestId: name.name_suggest_id,
    nameSuggestName: name.name_suggest_name,
    gender: name.gender,
    popularity: name.popularity,
    nameDays: name.name_days,
    namesakes: name.namesakes,
    origins: origins,
    meanings: meanings
  };
  return nameDTO;
};

const convertToOriginDTO = (origin: OriginStoredProcedure) => {
  const originDTO: OriginResponseDTO = {
    originId: origin.origin_id,
    region: origin.region,
    religion: origin.region,
    description: origin.description,
    nameId: origin.fk_name_suggest_id
  };
  return originDTO;
};

const convertToMeaningDTO = (meaning: MeaningStoredProcedure) => {
  const meaningDTO: MeaningResponseDTO = {
    meaningId: meaning.meaning_id,
    definition: meaning.definition,
    nameId: meaning.fk_name_suggest_id
  };
  return meaningDTO;
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
  // eslint-disable-next-line camelcase
  meaning_id: number;
  definition: string;
}

class OriginStoredProcedure {
  // eslint-disable-next-line camelcase
  origin_id: number;
  region: string;
  religion: string;
  description: string;
  // eslint-disable-next-line camelcase
  fk_name_suggest_id: number;
}

class MeaningStoredProcedure {
  // eslint-disable-next-line camelcase
  meaning_id: number;
  definition: string;
  // eslint-disable-next-line camelcase
  fk_name_suggest_id: number;
}
