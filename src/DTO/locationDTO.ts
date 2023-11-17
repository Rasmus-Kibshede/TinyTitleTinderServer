import { AddressRequestDTO, AddressResponseDTO } from './addressDTO';


export interface LocationResponseDTO{
    locationId: number;
    country: string; 
    addresses: AddressResponseDTO[];
}

export interface LocationRequestDTO{
    locationId?: number;
    country?: string;
    addresses?: AddressRequestDTO[];
}