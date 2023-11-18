export interface MeaningResponseDTO {
    meaningId: number;
    definition: string;
}

export interface MeaningRequestDTO {
    meaningId?: number;
    definition: string;
}