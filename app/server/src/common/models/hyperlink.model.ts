import { HttpVerb } from './httpVerb.type';

export class Hyperlink {
  href: string;
  rel: string;
  type: HttpVerb;

  constructor(config?: Partial<Hyperlink>) {
    Object.assign(this, config);
  }
}
