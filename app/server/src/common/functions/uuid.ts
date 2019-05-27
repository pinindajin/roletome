import { Provider } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

export const uuidProvider: Provider = {
  provide: 'UUID',
  useValue: uuid,
};
