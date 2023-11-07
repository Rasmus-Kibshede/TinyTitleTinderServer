import { Parent } from '../Entities/Parent';

export interface FamilyResponseDTO{
familyId: number;
familyName: string;
parents?: Parent[] | null;
}

export interface FamilyRequestDTO{
    familyId?: number;
    familyName: string;
    parents?: Parent[] | null;
}
