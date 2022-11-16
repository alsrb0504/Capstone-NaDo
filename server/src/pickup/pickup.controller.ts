import { Body, Controller, Get, HttpCode, Post, Query, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReqWithUser } from 'src/auth/type/request.type';
import { OrderDetail } from 'src/type/order/order.type';
import { Pickup } from 'src/type/pickup/pickup.type';
import { PickupDescription, PickupDetailDescription } from './pickup.decorator';
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
    const userSequence = (req?.user?.sequence || 1).toString()
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
}
