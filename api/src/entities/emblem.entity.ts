import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Emblem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  name: string;

  @Column()
  image: string;
}
