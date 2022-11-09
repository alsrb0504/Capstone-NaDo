import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable, InternalServerErrorException, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { last, lastValueFrom } from 'rxjs';
import { ReqWithUser } from 'src/auth/type/request.type';
import User from 'src/entity/user/user.entity';
import { CardRegisterType, CardType, RegisterCard } from 'src/type/payment/card.type';
import { ITossBilling } from 'toss-payments-server-api/lib/structures/ITossBilling';
import { Repository } from 'typeorm';
import { uuid } from 'uuidv4';

@Injectable()
export class PaymentService {
  constructor(
    private http: HttpService,
    @InjectRepository(User) private  userRepository: Repository<User>
  ) {}

  async registerCard(
      cardInfo: CardType,
      req: ReqWithUser
    ): Promise<RegisterCard> {

      const userData = await this.userRepository
        .createQueryBuilder('user')
        .where('user.sequence = :sequence', {sequence: req.user.sequence})
        .getOne()
      
      if(userData.paymentKey) {
        throw new ForbiddenException('user already registered card')
      }

      const customerKey = uuid()

      const data = this.http
        .post('http://host.docker.internal:30771/v1/billing/authorizations/card', {
          "cardNumber": cardInfo.cardNumber,
          "cardExpirationYear": cardInfo.cardExpirationYear,
          "cardExpirationMonth": cardInfo.cardExpirationMonth,
          "cardPassword": cardInfo.cardPassword,
          "customerBirthday": "0528",
          "consumerName": req.user.nickname,
          "customerEmail": req.user.email,
          "vbv": {
            "cavv": "1234",
            "xid": "1234",
            "eci": "23123"
          },
          "customerKey": customerKey
        }
      )
      const tossCardRegister: ITossBilling =  (await lastValueFrom(data)).data
  
      return {
        customerKey,
        data: tossCardRegister,
      }
    }

  async insertPaymentKey(
    billingKey: string,
    customerKey:string,
    userSequence: number | string
  ) {
    try {
      await this.userRepository
        .createQueryBuilder('user')
        .update(User)
        .set({
          customerKey,
          paymentKey: billingKey
        })
        .where('user.sequence = :sequence', {sequence: userSequence})
        .execute()
    } catch (err) {
      throw new InternalServerErrorException("카드 정보 삽입 실패 \n" + err.message)
    }
  }

  async deletePaymentKey(
    sequence: string | number
  ) {
      const userInfo = await this.userRepository
        .createQueryBuilder('user')
        .where('user.sequence = :sequence', {sequence})
        .getOne()
      
      if(userInfo.paymentKey) {
        throw new ForbiddenException("유저는 카드를 등록하지 않았습니다.")
      }

      try {
       await this.userRepository
        .createQueryBuilder('user')
        .update(User)
        .set({
          paymentKey: null,
          customerKey: null
        })
        .where('user.sequence = :sequence', {sequence})
        .execute()
      
    } catch (err) {
      throw new InternalServerErrorException("카드 정보 삭제 실패 \n" + err.message)
    }
  }

  async getCardInfo(
    sequence: number | string
  ) {
    try {
      const userInfo = await this.userRepository
        .createQueryBuilder('user')
        .where('user.sequence = :sequence', {sequence})
        .getOne()
      
        if(!userInfo.customerKey || !userInfo.paymentKey) {
          throw new ForbiddenException("간편 결제가 등록되어 있지 않습니다.")
        }
      
      const customerKey = userInfo.customerKey
      const paymentKey = userInfo.paymentKey

      const getCardInfoRx = this.http.post(`http://host.docker.internal:30771/v1/billing/authorizations/${paymentKey}`, {
        customerKey
      })

      const getCardInfo = (await lastValueFrom(getCardInfoRx)).data
      
      return getCardInfo

    } catch (err) {
      console.log(err.message)
      throw new InternalServerErrorException("카드가 등록되어 있지 않거나, 토스 서버 요청 실패 \n" +err.message)
    }
  }
}
