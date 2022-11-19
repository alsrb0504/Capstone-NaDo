import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Orders from "src/entity/orders/orders.entity";
import Store from "src/entity/store/store.entity";
import { GetAllStoreForPick, StoreDetail, StoreDetailForPick, StoreList } from "src/type/store/store.type";
import { getCurrentTime } from "src/util/util";
import { Repository } from "typeorm";

@Injectable()
export class StoreQueryService {
  constructor(
    @InjectRepository(Store) private storeRepository: Repository<StoreList>,
    @InjectRepository(Orders) private orderRepository: Repository<Orders>
  ) {}

  async getAllStore(): Promise<Array<StoreList>> {

    try {
      const storeInfo = await this.storeRepository
        .createQueryBuilder('store')
        .select("store.name")
        .addSelect("store.image")
        .addSelect("store.sequence")
        .addSelect("storebusinesstime.dayOfWeek")
        .addSelect("storebusinesstime.startTime")
        .addSelect("storebusinesstime.endTime")
        .innerJoin("store.businesstimes", "storebusinesstime")
        .getMany()
        
        return storeInfo
    } catch (err) {
      throw new InternalServerErrorException("get query error")
    }
  }
  async getAllStoreForPick() {

    try {

      const currTime = getCurrentTime()
      currTime.setMinutes(currTime.getMinutes() + 20)
      
      const orderCount = await this.orderRepository
      .createQueryBuilder('orders')
      .select([
        'orders.store',
        'COUNT(orders.store) AS pickupCnt'
      ])
      .where('orders.orderTimeout > :availableOrderDate', {availableOrderDate: currTime.toISOString().slice(0, 19).replace('T', ' ')})
      .andWhere('orders.orderStatus = :status', {status: 'ordered'})
      .groupBy('orders.store')
      .getRawMany()
      
      const storeInfo = await this.storeRepository
        .createQueryBuilder('store')
        .select([
          "store.name",
          "store.image",
          "store.sequence"
        ])
        .addSelect("storebusinesstime.dayOfWeek")
        .addSelect("storebusinesstime.startTime")
        .addSelect("storebusinesstime.endTime")
        .innerJoin("store.businesstimes", "storebusinesstime")
        .getMany()
        
        const result: any = storeInfo.map((store) => {
          const v = orderCount.filter((data) => data.storeSequence === store.sequence)
          let cnt;
          if(v.length) {
            cnt = v[0].pickupCnt
          }

          return {
            ...store,
            pickupCnt: parseInt(cnt) || 0
          }
        })

        return result
    } catch (err) {
      throw new InternalServerErrorException(err.message)
    }
  }

    async getStoreById(
      sequence: string
    ): Promise<StoreDetail>{
      try {
        const storeInfo = await this.storeRepository
          .createQueryBuilder('store')
          .select('store.name')
          .addSelect('store.image')
          .addSelect('store.sequence')
          .addSelect('store.telephone')
          .addSelect('store.lat')
          .addSelect('store.long')
          .addSelect("storebusinesstime.dayOfWeek")
          .addSelect("storebusinesstime.startTime")
          .addSelect("storebusinesstime.endTime")
          .addSelect("menu.sequence")
          .addSelect("menu.menuName")
          .addSelect("menu.menuPrice")
          .addSelect("menu.menuImg")
          .where('store.sequence = :sequence', {sequence})
          .leftJoin('store.businesstimes', 'storebusinesstime')
          .leftJoin('store.menus', 'menu')
          .getOne()

          console.log("storeInfo", storeInfo) 
          const storeImage = storeInfo?.image
          const locationLating = {
            lat: storeInfo?.lat,
            long: storeInfo?.long
          }

          delete storeInfo.image
          delete storeInfo.lat
          delete storeInfo.long


          const result =  {
            storeSequence: storeInfo.sequence,
            storeImage: storeImage,
            locationLating,
            ...storeInfo,
          }
          delete result.sequence

          return result
      }  catch (err) {
      console.log(err.message)
      throw new InternalServerErrorException("get query error")
    }
  }
  async getStoreByIdForPick(
    sequence: string
  ): Promise<StoreDetailForPick>{
    try {
      const storeInfo = await this.storeRepository
        .createQueryBuilder('store')
        .select('store.name')
        .addSelect('store.image')
        .addSelect('store.sequence')
        .addSelect('store.telephone')
        .addSelect('store.lat')
        .addSelect('store.long')
        .addSelect("storebusinesstime.dayOfWeek")
        .addSelect("storebusinesstime.startTime")
        .addSelect("storebusinesstime.endTime")
        .where('store.sequence = :sequence', {sequence})
        .leftJoin('store.businesstimes', 'storebusinesstime')
        .getOne()

        const currTime = getCurrentTime()
        currTime.setMinutes(currTime.getMinutes() + 20)

      const orderInfo = await this.orderRepository
        .createQueryBuilder('orders')
        .select([
          'orders.sequence AS orderSequence',
          'CONCAT_WS(" ",orders.address, orders.addressDetail) AS dest',
          'orders.menuPrice AS price',
          'orders.orderTimeout AS orderTimeout'
        ])
        .where('orders.store = :sequence', {sequence})
        .andWhere('orders.orderStatus = :status', {status: 'ordered'})
        .andWhere('orders.orderTimeout > :availableOrderDate', {availableOrderDate: currTime.toISOString().slice(0, 19).replace('T', ' ')})
        .getRawMany()

        console.log("storeInfo", storeInfo) 
        const storeImage = storeInfo?.image
        const locationLating = {
          lat: storeInfo?.lat,
          long: storeInfo?.long
        }

        delete storeInfo.image
        delete storeInfo.lat
        delete storeInfo.long


        const result =  {
          storeSequence: storeInfo.sequence,
          storeImage: storeImage,
          locationLating,
          pickupList: orderInfo,
          ...storeInfo,
        }
        delete result.sequence

        return result
    }  catch (err) {
    console.log(err.message)
    throw new InternalServerErrorException("get query error")
  }
}
}