export interface OriginResponseDTO {
    originId: number;
    region: string; 
    religion: string;
    description: string;
    nameId?: number;
}

export interface OriginRequestDTO {
    originId?: number;
    region: string;
    religion: string;
    description: string;
}