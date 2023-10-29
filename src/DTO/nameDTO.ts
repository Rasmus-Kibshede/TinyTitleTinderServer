export interface NameResponseDTO {
  nameSuggestName: string;
  gender: string;
  nameDays?: Date[] | null;
  namesakes?: string[] | null;
}

export interface NameRequestDTO {
  nameSuggestName: string;
  gender: string;
  nameDays?: Date[] | null;
  namesakes?: string[] | null;
}
