import { Origin } from '../Entities/Origin';

export interface NameResponseDTO {
  nameSuggestId?: number;
  nameSuggestName: string;
  gender: string;
  nameDays: string;
  namesakes: string;
  origins: Origin[];
}

export interface NameRequestDTO {
  nameSuggestId?: number;
  nameSuggestName: string;
  gender: string;
  nameDays: string;
  namesakes: string;
  origins: Origin[];
}
