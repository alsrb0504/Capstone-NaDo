import { Body, Controller, Delete, Get, HttpCode, HttpException, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { isLoggedInGuard } from 'src/auth/guard/cookieAuthentication.guard';
import { ReqWithUser } from 'src/auth/type/request.type';
import { CardType, RegisterCard } from 'src/type/payment/card.type';
import { DeleteCardDescription, GetCardInfoDescription, InsertCardDescription } from './payment.decorator';
import { PaymentService } from './payment.service';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(
    private paymentService: PaymentService
  ){}

  @UseGuards(isLoggedInGuard)
  @InsertCardDescription()
  @Post('card')
  @HttpCode(201)
  async registerCard(
    @Body() body: CardType,
    @Request() req: ReqWithUser 
  ) {
    const registedInfo: RegisterCard = await this.paymentService.registerCard(body, req)

    const billingKey: string = registedInfo.data.billingKey
    const customerKey: string = registedInfo.customerKey
    await this.paymentService.insertPaymentKey(billingKey, customerKey, req.user.sequence)

    return 'success'
  }

  @UseGuards(isLoggedInGuard)
  @DeleteCardDescription()
  @Delete('card')
  @HttpCode(200)
  async deleteCard(
    @Request() req: ReqWithUser
  ) {
      await this.paymentService.deletePaymentKey(req.user.sequence)
      return 'success'
    }

  @UseGuards(isLoggedInGuard)
  @GetCardInfoDescription()
  @Get('card')
  @HttpCode(200)
  async getCard(
    @Request() req: ReqWithUser
  ) {
    const userInfo = await this.paymentService.getCardInfo(req.user.sequence)
    return userInfo
  }

  @Post('card/fake')
  @HttpCode(201)
  async registerFakeCard(
    @Request() req: ReqWithUser
  ) {
    const result = await this.paymentService.registerFakeCard(req?.user.sequence || 1)
    return result
  }

  @Delete('card/fake')
  @HttpCode(200)
  async deleteFakeCard(
   @Request() req: ReqWithUser 
  ) {
    const result = await this.paymentService.deleteFakeCard(req?.user.sequence || 1)
    return result
  }
  }  


