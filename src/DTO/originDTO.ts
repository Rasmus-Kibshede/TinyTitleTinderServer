export interface OriginResponseDTO {
    originId: number;
    region: string; 
    religion: string;
    description: string;
}

export interface OriginRequestDTO {
    originId?: number;
    region: string;
    religion: string;
    description: string;
}