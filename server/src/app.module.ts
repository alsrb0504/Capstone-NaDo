import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'; 
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { StoreModule } from './store/store.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';

import User from './entity/user.entity'
import Store from './entity/store.entity'
import Order from './entity/orders.entity'
import Orderdetails from './entity/orderdetails.entity';
import Menu from './entity/menu.entity';
import Storebusinesstime from './entity/storebusinesstime.entity';
import Menusize from './entity/menusize.entity';
import Pickedorder from './entity/pickedorder.entity';


@Module({
  imports: [
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
        } 
      }
    }),
    UserModule,
    StoreModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: []
})
export class AppModule {}
