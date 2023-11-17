import { ParentRequestDTO, ParentResponseDTO } from './parentDTO';

export interface FamilyResponseDTO{
familyId: number;
familyName: string;
parents?: ParentResponseDTO[] | null;
}

export interface FamilyRequestDTO{
    familyId?: number;
    familyName: string;
    parents?: ParentRequestDTO[] | null;
}
