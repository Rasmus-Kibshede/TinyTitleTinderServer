export interface AddressResponseDTO{
    addressId: number;
    city: string; 
    zipcode: string;
    address: string;
}

export interface AddressRequestDTO{
    addressId?: number;
    city: string; 
    zipcode: string;
    address: string;
}
