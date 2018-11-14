import { LoggerService } from '@nestjs/common';

export class DefaultLogger implements LoggerService {
  log(message: string) {
    process.stdout.write(`\n@Info: ${message}\r`);
  }
  error(message: string, trace: string) {
    process.stdout.write(`\n@Error: ${message} \n Trace... ${trace}\r`);
  }
  warn(message: string) {
    process.stdout.write(`\n@Warn: ${message}\r`);
  }
}