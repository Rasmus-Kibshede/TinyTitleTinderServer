import { NameRequestDTO, NameResponseDTO } from './nameDTO';

export interface MeaningResponseDTO {
    meaningId: number;
    definition: string;
    names?: NameResponseDTO[] | null;
}

export interface MeaningRequestDTO {
    meaningId?: number;
    definition: string;
    names?: NameRequestDTO[];
}