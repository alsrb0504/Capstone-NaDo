import { Body, Controller, Get, HttpCode, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { isLoggedInGuard } from 'src/auth/guard/cookieAuthentication.guard';
import { ReqWithUser } from 'src/auth/type/request.type';
import { OrderDetail, OrderPay } from 'src/type/order/order.type';
import { orderdetailDescription, orderListDescription, orderPayDescription } from './order.decorator';
import { OrderService } from './order.service';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService
  ) {}

  // @UseGuards(isLoggedInGuard)
  @Post('pay')
  @orderPayDescription()
  @HttpCode(200)
  async orderPay(
    @Body() body: OrderPay,
    @Request() req: ReqWithUser
  ) {
    const orderPayResult = await this.orderService.orderPay(body, req?.user?.sequence || 1)

    return orderPayResult
  }

  // @UseGuards(isLoggedInGuard)
  @Get('user')
  @orderListDescription()
  @HttpCode(200)
  async getOrderByUser(
    @Request() req: ReqWithUser,
  ) {
   const orderLists = await this.orderService.getOrderByUser(req?.user?.sequence || 1)
   
   return orderLists
  }

  @Get('detail')
  @orderdetailDescription()
  async orderDetail(
    @Query('orderSequence') orderSequence: string
  ): Promise<OrderDetail> {
    const orderDetail = await this.orderService.getOrderDetail(orderSequence)

    return orderDetail
  }

}
