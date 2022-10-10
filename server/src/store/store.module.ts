import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Store from 'src/entity/store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Store])],
  providers: [StoreService],
  controllers: [StoreController],
  exports: [StoreService]
})
export class StoreModule {}
