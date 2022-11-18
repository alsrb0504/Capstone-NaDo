import { Body, Controller, Get, HttpCode, Post, Query, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReqWithUser } from 'src/auth/type/request.type';
import { OrderDetail } from 'src/type/order/order.type';
import { Pickup, PickupList_, PickupSequence } from 'src/type/pickup/pickup.type';
import { PickupList } from 'src/type/store/store.type';
import { DeletePickupDescription, PickupDescription, PickupDetailDescription, PickupListDescription } from './pickup.decorator';
import { PickupService } from './pickup.service';

@ApiTags('pickup')
@Controller('pickup')
export class PickupController {
  constructor(
    private pickupService: PickupService
  ) {}

  @Post()
  @PickupDescription()
  @HttpCode(200)
  async pickup(
    @Body() body: Pickup,
    @Request() req: ReqWithUser
  ): Promise<string> {
    const orderSequence = (body.orderSequence).toString()
    const userSequence = (req?.user?.sequence || 3).toString()
    const pickkupResult = await this.pickupService.pickup(orderSequence, userSequence) 

    return pickkupResult
  }

  @Get('detail')
  @PickupDetailDescription()
  @HttpCode(200)
  async pickupDetail(
    @Query('pickupSequence') pickupSequence: string
  ): Promise<OrderDetail> {
    const pickupDetailResult = await this.pickupService.pickupDetail(pickupSequence)

    return pickupDetailResult
  }

  @Get('list')
  @PickupListDescription()
  @HttpCode(200)
  async pickupList(
    @Request() req: ReqWithUser
  ): Promise<Array<PickupList_>> {
    const pickupListResult = await this.pickupService.pickupList(req?.user?.sequence || 1)

    return pickupListResult
  }

  @Post('cancel')
  @DeletePickupDescription()
  @HttpCode(200)
  async deletePickup(
    @Body() body: PickupSequence
  ) {
    const deletePickupResult = await this.pickupService.deletePickup(body.pickupSequence)

    return deletePickupResult
  }

  // @Post('complete')
  // @HttpCode(200)
  // async completePickup(
  //   @Body() body: PickupSequence
  // ) {
  //   const completePickupResult = await this.pickupService.completePickup(body.pickupSequence)
  //   return completePickupResult
  // }
}
