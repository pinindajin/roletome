import { Entity, PrimaryGeneratedColumn, Column, Generated } from 'typeorm';

@Entity()
export class DbGame {
  @PrimaryGeneratedColumn() seqId: number;

  @Column()
  id: string;

  @Column() name: string;

  @Column({ nullable: true }) description: string;

  constructor(config?: Partial<DbGame>) {
    Object.assign(this, config);
  }
}
