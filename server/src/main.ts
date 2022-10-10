import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';


import { AppModule } from './app.module';

import * as session from 'express-session'
import * as cookieParser from 'cookie-parser';
import * as createRedisStore from 'connect-redis';
import * as passport from 'passport';
import {createClient} from 'redis';



async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  app.use(cookieParser())

  const RedisStore = createRedisStore(session);
  const redisHost = configService.get<string>('REDIS_HOST')
  const redisPort = configService.get<number>('REDIS_PORT')
  const redisClient = createClient({
    legacyMode: true,
    socket: {
      port: redisPort,
      host: redisHost,
    }
  })

  
  redisClient.on('error', (err) => {
    logger.error("Could not establish a connection with redis", err)
  })
  
  redisClient.on('connect', () => {
    logger.verbose('Connected to redis successfully')
  })
  
  app.enableCors({
    origin: 'http://localhost:3002',
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    credentials: true
  })
  
  app.use(session({
      store: new RedisStore({
        client: redisClient
      }),
      secret: configService.get<string>('session_secret'),
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 10
      },
    }))
    
    app.use(passport.initialize())
    app.use(passport.session())
    redisClient.connect();

  await app.listen(3000);
}
bootstrap();
