import { Name } from '../Entities/Name';

export interface MeaningResponseDTO {
    meaningId: number;
    definition: string;
    names?: Name[] | null;
}

export interface MeaningRequestDTO {
    meaningId?: number;
    definition: string;
    names?: Name[];
}