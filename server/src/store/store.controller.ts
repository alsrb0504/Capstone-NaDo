import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { StoreService } from './store.service';
import Store from 'src/entity/store/store.entity';

@Controller('store')
export class StoreController {
  constructor(
    private storeService: StoreService
  ){}

  @Post('insert')
  @HttpCode(200)
  async insertStore(
    @Body() body: Partial<Store>
  ) {
    await this.storeService.insert(body)
    return 'success'
  }
}
