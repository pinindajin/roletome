import * as dotenv from 'dotenv';
dotenv.config();

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConfigService {
  constructor() {}
}