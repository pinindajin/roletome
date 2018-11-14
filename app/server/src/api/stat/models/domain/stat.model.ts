import { IsUUID, IsInt, IsString } from 'class-validator';

export class Stat {
  @IsUUID('4') id: string;

  @IsInt() value: number;

  @IsString() name: string;

  @IsString() description: string;

  constructor(config?: Partial<Stat>) {
    Object.assign(this, config);
  }
}
