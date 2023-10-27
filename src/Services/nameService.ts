import { NameRequestDTO, NameResponseDTO } from '../DTO/nameDTO';
import { Name } from '../Entities/Name';
import { nameRepo } from '../Repositories/nameRepository';

export const createName = async (nameRequestDTO: NameRequestDTO) => {
        const save = await nameRepo.save(nameRequestDTO);
        return convertToDTO(save);
};

const convertToDTO = (name: Name) => {
    const dto: NameResponseDTO = {
        name: name.nameSuggestName,
        gender: name.gender,
        popularity: name.popularity,
        nameDays: name.nameDays,
        namesakes: name.namesakes
    };
    return dto;
};