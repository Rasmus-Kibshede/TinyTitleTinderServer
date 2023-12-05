import { Column } from 'typeorm';
import { Definition } from './Definition';

export class Origin {
  @Column('varchar', { name: 'region' })
  region: string;

  @Column('varchar', { name: 'religion' })
  religion: string;

  @Column('varchar', { name: 'description' })
  description: Definition;
}
