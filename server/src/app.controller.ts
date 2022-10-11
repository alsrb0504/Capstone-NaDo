import { Controller, Get, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(
    @Request() req
  ): string {
    console.log("app service")
    return this.appService.getTest(req);
  }
}
