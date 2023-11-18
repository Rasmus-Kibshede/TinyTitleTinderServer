import { MeaningRequestDTO, MeaningResponseDTO } from './meaningDTO';
import { OriginRequestDTO, OriginResponseDTO } from './originDTO';

export interface NameResponseDTO {
  nameSuggestId?: number;
  nameSuggestName: string;
  gender: string;
  nameDays: string;
  namesakes: string;
  origins: OriginResponseDTO[] | null;
  meanings?: MeaningResponseDTO[] | null;
}

export interface NameRequestDTO {
  nameSuggestId?: number;
  nameSuggestName: string;
  gender: string;
  nameDays: string;
  namesakes: string;
  origins: OriginRequestDTO[] | null;
  meanings?: MeaningRequestDTO[] | null;
}
