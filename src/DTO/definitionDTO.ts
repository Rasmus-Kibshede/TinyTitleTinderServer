export interface DefinitionResponseDTO {
    definitionId: number;
    meaning: string;
}

export interface DefinitionRequestDTO {
    definitionId?: number;
    meaning: string;
}