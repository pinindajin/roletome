import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';

export const bootstrapTypeOrm = (config: ConnectionOptions) => TypeOrmModule.forRoot(config);
