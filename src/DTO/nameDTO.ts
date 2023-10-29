export interface NameResponseDTO {
  nameSuggestName: string;
  gender: string;
}

export interface NameRequestDTO {
  nameSuggestName: string;
  gender: string;
  namedays?: Date;
  namesakes?: string;
}
