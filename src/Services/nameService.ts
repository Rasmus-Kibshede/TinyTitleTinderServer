import { MeaningResponseDTO } from '../DTO/meaningDTO';
import { NameRequestDTO, NameResponseDTO } from '../DTO/nameDTO';
import { OriginResponseDTO } from '../DTO/originDTO';
import { Name } from '../Entities/Name';
import { nameRepo } from '../Repositories/nameRepository';
import { failed, success } from '../Utils/errorHandler';

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
    const names = await nameRepo.findNamesByParentId(parentId);
    const nameDTOs: NameResponseDTO[] = names[0].map((name: NameStoredProcedure) => convertToDTOSpecial(name));

    const nameMap = new Map<number, NameResponseDTO>();
    //const originMap = new Map<number, OriginResponseDTO>();
    //const meaningMap = new Map<number, MeaningResponseDTO>();
    for (const name of nameDTOs) {
      const existingName = nameMap.get(name.nameSuggestId!);

      //LOW LVL SHIT!
      if (existingName?.nameSuggestId === name.nameSuggestId) {
        //existingName!.origins?.concat(name.origins!);
        //existingName!.meanings?.concat(name.meanings!); 
        for (const origin of name.origins!) {
          existingName?.origins?.push(origin);
        }
        for (const meaning of name.meanings!) {
          existingName?.meanings?.push(meaning);
        }
        //Disse burde virke, men det gør de ikke. Så har lavet ovenstående som low lvl løsning. 
      } else {
        nameMap.set(name.nameSuggestId!, { ...name });
      }
    }

    const resultArray: NameResponseDTO[] = Array.from(nameMap.values());
    /*    for(const name of resultArray){
          const uniqueSetOrigins = new Set(name.origins);
          const uniqueSetMeanings = new Set(name.meanings);
          name.origins = [...uniqueSetOrigins];
          name.meanings = [...uniqueSetMeanings];
        }*/
    return success(resultArray);
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
  console.log(name);

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

const convertToDTOSpecial = (name: NameStoredProcedure) => {
  const nameDTO: NameResponseDTO = {
    nameSuggestId: name.name_suggest_id,
    nameSuggestName: name.name_suggest_name,
    gender: name.gender,
    popularity: name.popularity,
    nameDays: name.name_days,
    namesakes: name.namesakes,
    origins: [],
    meanings: []
  };

  const originDTO: OriginResponseDTO = {
    originId: name.origin_id,
    region: name.region,
    religion: name.religion,
    description: name.description
  };

  const meaningDTO: MeaningResponseDTO = {
    meaningId: name.meaning_id,
    definition: name.definition
  };

  nameDTO.origins?.push(originDTO);
  nameDTO.meanings?.push(meaningDTO);
  /*
  "origin_id": 2,
            "region": "India",
            "religion": "Hinduism",
            "description": "Budda checkin",
  */
  return nameDTO;
};
/*
const mergeDublicates = (name: NameResponseDTO) => {


};
*/
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
