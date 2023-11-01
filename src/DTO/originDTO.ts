import { Name } from '../Entities/Name';

export interface OriginResponseDTO {
    originId: number;
    region: string; 
    religion: string;
    description: string;
    names: Name[];
}

export interface OriginRequestDTO {
    originId?: number;
    region: string;
    religion: string;
    description: string;
    names: Name[];
}