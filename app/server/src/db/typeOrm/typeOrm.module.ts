import { TypeOrmModule } from '@nestjs/typeorm';

export const bootstrapTypeOrm = config => TypeOrmModule.forRoot(config);
