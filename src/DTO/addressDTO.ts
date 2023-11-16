import { Location } from '../Entities/Location';
import { LocationRequestDTO } from './locationDTO';
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
    location?: Location | LocationRequestDTO;
}
