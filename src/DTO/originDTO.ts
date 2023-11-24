import { DefinitionRequestDTO, DefinitionResponseDTO } from './definitionDTO';

export interface OriginResponseDTO {
    originId: number;
    region: string; 
    religion: string;
    description: string;
    definition: DefinitionResponseDTO;
    nameId?: number;
}

export interface OriginRequestDTO {
    originId?: number;
    region: string;
    religion: string;
    definition: DefinitionRequestDTO;
    description: string;
}