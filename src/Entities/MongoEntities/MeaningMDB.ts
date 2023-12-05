import { Column } from 'typeorm';

export class MeaningMDB {
  
    @Column('varchar', { length: 255, nullable: false, name: 'definition' })
    definition: string;
  
    constructor(definition: string) {
      this.definition = definition;
    }
  }