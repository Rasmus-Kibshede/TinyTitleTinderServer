import { LocationRequestDTO, LocationResponseDTO } from './locationDTO';
export interface AddressResponseDTO {
    addressId: number;
    city: string;
    zipcode: string;
    address: string;
    location: LocationResponseDTO;
}

export interface AddressRequestDTO {
    addressId?: number;
    city: string;
    zipcode: string;
    address: string;
    location?: LocationRequestDTO;
}
