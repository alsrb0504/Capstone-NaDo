import { Body, Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { isLoggedInGuard } from 'src/auth/guard/cookieAuthentication.guard';
import { ReqWithUser } from 'src/auth/type/request.type';
import { OrderPay } from 'src/type/order/order.type';
import { orderPayDescription } from './order.decorator';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(
    private orderService: OrderService
  ) {}

  @UseGuards(isLoggedInGuard)
  @orderPayDescription()
  @Post('pay')
  @HttpCode(200)
  async orderPay(
    @Body() body: OrderPay,
    @Request() req: ReqWithUser
  ) {
    const orderPayResult = await this.orderService.orderPay(body, req.user)

    return orderPayResult
  }
}
