import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { Validator } from 'class-validator';

@Injectable()
export class ValidateUUIDPipe implements PipeTransform<string, string> {
  readonly validator: Validator;

  constructor() {
    this.validator = new Validator();
  }

  transform(value: string, metadata: ArgumentMetadata): string {
    if (!this.validator.isUUID(value, '4'))
      throw new BadRequestException(`${value} must be a version 4 UUID.`);
    return value;
  }
}
