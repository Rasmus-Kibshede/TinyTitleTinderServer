import { DefinitionRequestDTO, DefinitionResponseDTO } from '../DTO/definitionDTO';
import { Definition } from '../Entities/Mysql/Definition';
import { definitionRepo } from '../Repositories/Mysql/definitionRepository';
import { failed, success } from '../Utils/errorHandler';

export const createDefinition = async (definitionRequestDTO: DefinitionRequestDTO) => {
    try {
        const response = await definitionRepo.save(definitionRequestDTO);
        return success(convertToDTO(response));

    } catch (err) {
        return failed(err);
    }
};

export const getDefinitions = async () => {
    try {
        const definitions = await definitionRepo.findAll();
        const definitionDTOs: DefinitionResponseDTO[] = definitions.map((definition: Definition) => convertToDTO(definition));
        return success(definitionDTOs);

    } catch (err) {
        return failed(err);
    }
};

export const getDefinitionById = async (id: number) => {
    try {
        const response = await definitionRepo.findOneByID(id);
        if (!response) {
            return failed('definition');
        }
        return success(convertToDTO(response));

    } catch (err) {
        return failed(err);
    }
};

export const updateDefinition = async (definitionRequestDTO: DefinitionRequestDTO) => {
    try {
        const response = await definitionRepo.save(definitionRequestDTO);
        return success(convertToDTO(response));

    } catch (err) {
        return failed(err);
    }
};

export const deleteDefinition = async (definitionId: number) => {
    try {
        const definitionDB = await definitionRepo.findOneByID(definitionId);
        if (!definitionDB) {
            return failed('definition');
        }

        const response = await definitionRepo.remove(definitionDB);
        return success(convertToDTO(response));

    } catch (err) {
        return failed(err);
    }
};

const convertToDTO = (definition: Definition) => {
    const dto: DefinitionResponseDTO = {
        definitionId: definition.definitionId,
        meaning: definition.meaning
    };
    return dto;
};