import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';



import { AppModule } from './app.module';

import * as session from 'express-session'
import * as cookieParser from 'cookie-parser';
import * as createRedisStore from 'connect-redis';
import * as passport from 'passport';
import * as Redis from 'redis';
import { HttpExceptionFilter } from './http.exception';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'



async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('NaDo application')
  .setDescription('Nado api description')
  .setVersion('1.0')
  .addTag('nado')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      const errorMessages = {};
      errors.forEach(error => {
        if(error.value === undefined) {
          errorMessages[error.property]= "this property is not existed" 
        } else {
          errorMessages[error.property]= Object.values(error.constraints).join('. ').trim();
        }
      })
      return new BadRequestException(errorMessages);
    }
  }))

  const configService = app.get<ConfigService>(ConfigService);

  app.use(cookieParser())
  
  app.enableCors({
    origin: ['http://localhost:3002', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    credentials: true
  })

  const redisHost = configService.get<string>('REDIS_HOST')
  const redisPort = configService.get<number>('REDIS_PORT')
  
  const redisClient = Redis.createClient({
    legacyMode: true,
    url: `redis://${redisHost}:${redisPort}`
  })
  const RedisStore = createRedisStore(session);

  redisClient.connect()
    .then(() => {
      logger.log("redis connected")
    })
    .catch(() => {
      logger.log("not connected");
    })
  
  
  app.use(session({
      store: new RedisStore({
        client: redisClient
      }),
      secret: configService.get<string>('session_secret'),
      resave: true,
      saveUninitialized: true,
      cookie: {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        secure: false,
      },
    }))
    
    app.use(passport.initialize())
    app.use(passport.session())
    app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
