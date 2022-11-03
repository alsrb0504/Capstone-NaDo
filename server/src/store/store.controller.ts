import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { StoreService } from './store.service';
import Store from 'src/entity/store/store.entity';
import { StoreQueryService } from './storequery.service';
import { GetAllStoreDescription } from './store.decorator';
import { StoreList } from 'src/type/store/store.type';

@Controller('store')
export class StoreController {
  constructor(
    private storeService: StoreService,
    private storeQueryService: StoreQueryService
  ){}

  @Post('insert')
  @HttpCode(200)
  async insertStore(
    @Body() body: Partial<Store>
  ) {
    await this.storeService.insert(body)
    return 'success'
  }

  @Get()
  @GetAllStoreDescription()
  @HttpCode(200)
  async getAllStore(): Promise<Array<StoreList>>{
    const allStoreInfo = await this.storeQueryService.getAllStore()
    return allStoreInfo
  }
}
