import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Name } from './Name';

@Entity()
export class Origin {

    @PrimaryGeneratedColumn({ name: 'origin_id' })
    originId: number;

    @Column('varchar', { length: 255, nullable: false, name: 'region' })
    region: string;

    @Column('varchar', { length: 255, nullable: false, name: 'religion' })
    religion: string;

    @Column('varchar', { length: 255, nullable: false, name: 'description' })
    description: string;

    @ManyToMany(() => Name, (name) => name.origins)
    @JoinColumn()
    names: Name[];
}