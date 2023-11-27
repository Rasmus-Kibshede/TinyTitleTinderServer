import { OriginRequestDTO, OriginResponseDTO } from './originDTO';

export interface NameResponseDTO {
  nameSuggestId?: number;
  nameSuggestName: string;
  gender: string;
  nameDays: string;
  namesakes: string;
  popularity: number;
  origins: OriginResponseDTO[] | null;
}

export interface NameRequestDTO {
  nameSuggestId?: number;
  nameSuggestName: string;
  gender: string;
  nameDays: string;
  namesakes: string;
  origins: OriginRequestDTO[] | null;
}
