import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service'; 

import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'; 
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path'
import { UserModule } from './user/user.module';
import { StoreModule } from './store/store.module';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { PaymentModule } from './payment/payment.module';
import configuration from './config/configuration';

import User from './entity/user/user.entity';
import Store from './entity/store/store.entity'
import Order from './entity/orders/orders.entity'
import Orderdetails from './entity/orderdetails/orderdetails.entity';
import Menu from './entity/menu/menu.entity';
import Storebusinesstime from './entity/storebusinesstime/storebusinesstime.entity';
import Menusize from './entity/menusize/menusize.entity';
import Pickedorder from './entity/pickedorder/pickedorder.entity';


@Module({
  imports: [
    HttpModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static', 'images'),
      serveRoot: "/file"
    }),
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: ['.env.server']
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
        return {
          type: configService.get<'mysql'>('database_type'),
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.user'),
          password: configService.get<string>('database.passwd'),
          database: configService.get<string>('database.database'),
          entities: [User, Store, Order, Orderdetails, Menu, Storebusinesstime, Menusize, Pickedorder],
          synchronize: true,
          charset:'utf8mb4'
        } 
      }
    }),
    UserModule,
    StoreModule,
    AuthModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: []
})
export class AppModule {}
