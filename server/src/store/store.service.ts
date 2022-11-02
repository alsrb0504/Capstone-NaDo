import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Store from 'src/entity/store/store.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store) private storeRepository: Repository<Store>
  ) {}

  async insert(
    store: Partial<Store> 
  ) {
    await this.storeRepository
      .createQueryBuilder("insertStore")
      .insert()
      .into(Store)
      .values([store])
      .execute()
  }
}
