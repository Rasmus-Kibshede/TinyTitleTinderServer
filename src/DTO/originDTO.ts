import { Name } from '../Entities/Name';

export interface OriginResponseDTO {
    region: string;
    religion: string;
    description: string;
    names: Name[];
}

export interface OriginRequestDTO {
    region: string;
    religion: string;
    description: string;
    names: Name[];
}