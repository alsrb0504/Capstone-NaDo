import { Module, OnModuleInit } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import Store from 'src/entity/store/store.entity';
import { Repository } from 'typeorm';
import Menu from 'src/entity/menu/menu.entity';
import Storebusinesstime from 'src/entity/storebusinesstime/storebusinesstime.entity';
import { StoreQueryService } from './storequery.service';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Menu, Storebusinesstime])],
  providers: [StoreService, StoreQueryService],
  controllers: [StoreController],
  exports: [StoreService]
})
export class StoreModule implements OnModuleInit {
  constructor( 
    private readonly storeService: StoreService
  ) {}

  async onModuleInit() {
    await this.storeService.storeInfoInsert()  
  }
}
