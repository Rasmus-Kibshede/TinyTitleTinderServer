import { Location } from '../Entities/Location';
export interface AddressResponseDTO{
    addressId: number;
    city: string; 
    zipcode: string;
    address: string;
    location: Location;
}

export interface AddressRequestDTO{
    addressId?: number;
    city: string; 
    zipcode: string;
    address: string;
    location: Location;
}
