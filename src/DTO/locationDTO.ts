import { Address } from '../Entities/Address'; 


export interface LocationResponseDTO{
    locationId: number;
    country: string; 
    addresses: Address[];
}

export interface LocationRequestDTO{
    locationId?: number;
    country?: string;
    addresses?: Address[];
}