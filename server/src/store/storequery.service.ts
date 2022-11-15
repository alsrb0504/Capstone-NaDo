import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Orders from "src/entity/orders/orders.entity";
import Store from "src/entity/store/store.entity";
import { GetAllStoreForPick, StoreDetail, StoreList } from "src/type/store/store.type";
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
      
      const orderCount = await this.orderRepository
      .createQueryBuilder('orders')
      .select([
        'orders.store',
        'COUNT(orders.store) AS pickupCnt'
      ])
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
}