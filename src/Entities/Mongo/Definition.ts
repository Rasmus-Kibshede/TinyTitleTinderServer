import { Column } from 'typeorm';

export class Definition {
  @Column('varchar', { name: 'meaning' })
  meaning: string;
}
