import { Address } from '../Entities/Location'; 

export interface LocationResponseDTO{
    locationId: number;
    country: string; 
    addressId: Address;
}

export interface LocationRequestDTO{
    locationId?: number;
    country: string;
    addressId: Address;
}