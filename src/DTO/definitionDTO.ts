export interface DefinitionResponseDTO {
    definitionId: number;
    meaning: string;
    nameId?: number;
}

export interface DefinitionRequestDTO {
    definitionId?: number;
    meaning: string;
}