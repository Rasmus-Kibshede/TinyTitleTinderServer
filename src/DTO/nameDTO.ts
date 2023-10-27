export interface NameResponseDTO {
    name: string;
    gender: string;
    popularity: number | null;
    nameDays: Date | null;
    namesakes: string | null;
}

export interface NameRequestDTO {
    name: string;
    gender: string;
    popularity: number | null;
    nameDays: Date | null;
    namesakes: string | null;
}