import { Body, Controller, Get, HttpCode, Post, Query, Response } from '@nestjs/common';
import { StoreService } from './store.service';
import Store from 'src/entity/store/store.entity';
import { StoreQueryService } from './storequery.service';
import { GetAllStoreDescription, GetAllStoreForPickDescription, GetStoreByIdDescription } from './store.decorator';
import { GetAllStore, GetAllStoreForPick, StoreDetail, StoreList } from 'src/type/store/store.type';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("store")
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
  async getAllStore(): Promise<Array<GetAllStore>>{
    const allStoreInfo = await this.storeQueryService.getAllStore()
    return allStoreInfo
  }

  @Get('detail')
  @GetStoreByIdDescription()
  @HttpCode(200)
  async getStoreByStoreId(
    @Query('sequence') sequence: string
  ): Promise<StoreDetail> {
    const storeInfo = await this.storeQueryService.getStoreById(sequence)

    return storeInfo
  }

  @Get('picker')
  @GetAllStoreForPickDescription()
  @HttpCode(200)
  async getAllStoreForPick(
  ): Promise<Array<GetAllStoreForPick>> {
    const result = await this.storeQueryService.getAllStoreForPick()
    return result
  }


}
