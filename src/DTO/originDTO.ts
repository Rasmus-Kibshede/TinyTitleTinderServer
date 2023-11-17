import { NameRequestDTO, NameResponseDTO } from './nameDTO';

export interface OriginResponseDTO {
    originId: number;
    region: string; 
    religion: string;
    description: string;
    names: NameResponseDTO[];
}

export interface OriginRequestDTO {
    originId?: number;
    region: string;
    religion: string;
    description: string;
    names: NameRequestDTO[];
}