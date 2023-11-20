export interface LocationResponseDTO {
    locationId: number;
    country: string;
}

export interface LocationRequestDTO {
    locationId?: number;
    country?: string;
}