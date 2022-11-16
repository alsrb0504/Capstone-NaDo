import { ForbiddenException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Orders from 'src/entity/orders/orders.entity';
import Pickedorder from 'src/entity/pickedorder/pickedorder.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PickupService {
  constructor(
    @InjectRepository(Pickedorder) private pickupRepository: Repository<Pickedorder>,
    @InjectRepository(Orders) private ordersRepository: Repository<Orders>,
    private dataSource: DataSource
  ){}

  async pickup(
    orderSequence: string,
    userSequence: string
  ) {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()

    await queryRunner.startTransaction();
    try {
      const pickupInfo = await this.pickupRepository
        .createQueryBuilder('pickedorder')
        .select('pickedorder.sequence')
        .leftJoinAndSelect('pickedorder.order', 'orders')
        .where('pickedorder.picker = :pickerSequence', {pickerSequence: userSequence})
        .andWhere('orders.orderStatus = :status', {status: 'ordered'})
        .getMany()
      
      console.log(pickupInfo)
      
      // throw new Error("afsd")
      if(pickupInfo.length) {
        throw new ForbiddenException("you already picked order")
      }

      await this.pickupRepository
        .createQueryBuilder('pickedorder')
        .insert()
        .into(Pickedorder)
        .values([{
          picker: () => userSequence,
          order: () => orderSequence
        }])
        .execute()

      await this.ordersRepository
        .createQueryBuilder('orders')
        .update(Orders)
        .set({
          orderStatus: 'pickuped'
        })
        .where('orders.sequence = :orderSequence', {orderSequence})
        .execute()

      await queryRunner.commitTransaction()
      return 'success'
    } catch (err) {
        await queryRunner.rollbackTransaction()
        throw new HttpException(err.message, err?.status | 500)              
    }
  }

  async pickupDetail(
    pickupSequence: string
  ) {
    try {
      const pickupInfo = await this.pickupRepository
        .createQueryBuilder('pickedorder')
    } catch (err){
      
    }
  }
}
