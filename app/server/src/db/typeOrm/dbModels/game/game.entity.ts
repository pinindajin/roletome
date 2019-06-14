import { Entity, PrimaryGeneratedColumn, Column, Generated, PrimaryColumn } from 'typeorm';

@Entity()
export class DbGame {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column() name: string;

  @Column({ nullable: true }) description: string;

  constructor(config?: Partial<DbGame>) {
    Object.assign(this, config);
  }
}
