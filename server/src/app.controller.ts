import { HttpService } from '@nestjs/axios';
import { Controller, ForbiddenException, Get, Inject, Post, Request, Response } from '@nestjs/common';
import { catchError, map, lastValueFrom } from 'rxjs';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private http: HttpService
    ) {}
}
