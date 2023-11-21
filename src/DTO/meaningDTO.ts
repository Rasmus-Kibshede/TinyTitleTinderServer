export interface MeaningResponseDTO {
    meaningId: number;
    definition: string;
    nameId?: number;
}

export interface MeaningRequestDTO {
    meaningId?: number;
    definition: string;
}