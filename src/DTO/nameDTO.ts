import { Meaning } from '../Entities/Meaning';
import { Origin } from '../Entities/Origin';

export interface NameResponseDTO {
  nameSuggestId?: number;
  nameSuggestName: string;
  gender: string;
  nameDays: string;
  namesakes: string;
  popularity: number;
  origins: Origin[] | null;
  meanings?: Meaning[] | null;
}

export interface NameRequestDTO {
  nameSuggestId?: number;
  nameSuggestName: string;
  gender: string;
  nameDays: string;
  namesakes: string;
  origins: Origin[] | null;
  meanings?: Meaning[] | null;
}
