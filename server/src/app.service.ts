import { Injectable, Request } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getTest(
    req: any
  ) {
    return req.user
  }
}
