import { Body, Controller, Get, HttpCode, Logger, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { isLoggedInGuard } from 'src/auth/guard/cookieAuthentication.guard';
import { ReqWithUser } from 'src/auth/type/request.type';
import { OrderDetail, OrderPay, OrderSequence, SettleOrder } from 'src/type/order/order.type';
import { OrderCompleteDescription, orderdetailDescription, orderListDescription, orderPayDescription, SettleOrderDescription } from './order.decorator';
import { OrderService } from './order.service';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService
  ) {}

  private readonly logger = new Logger(OrderController.name)

  // @UseGuards(isLoggedInGuard)
  @Post('pay')
  @orderPayDescription()
  @HttpCode(200)
  async orderPay(
    @Body() body: OrderPay,
    @Request() req: ReqWithUser
  ) {
    this.logger.log('/order/pay')
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
    this.logger.log('/order/user')
   const orderLists = await this.orderService.getOrderByUser(req?.user?.sequence || 1)
   
   return orderLists
  }

  @Get('detail')
  @orderdetailDescription()
  @HttpCode(200)
  async orderDetail(
    @Query('orderSequence') orderSequence: string
  ): Promise<OrderDetail> {
    this.logger.log('/order/detail')
    const orderDetail = await this.orderService.getOrderDetail(orderSequence)

    return orderDetail
  }

  @Post('complete')
  @OrderCompleteDescription()
  @HttpCode(200) 
  async completeOrder(
    @Body() body: OrderSequence
  ) {
    this.logger.log('/order/complete')
    const completeOrderResult = await this.orderService.completeOrder(body.orderSequence)
    return completeOrderResult
  }

  @Get('settle')
  @SettleOrderDescription()
  @HttpCode(200)
  async settleOrder(
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
    @Request() req: ReqWithUser
  ): Promise<Array<SettleOrder>>{
    const settleOrderResult = await this.orderService.settleOrder(startTime, endTime, req?.user?.sequence || 1)
    return settleOrderResult
  }
}
