import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Store from "src/entity/store/store.entity";
import { StoreList } from "src/type/store/store.type";
import { Repository } from "typeorm";

@Injectable()
export class StoreQueryService {
  constructor(
    @InjectRepository(Store) private storeRepository: Repository<StoreList>
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

    async getStoreById(
      sequence: string
    ) {
      try {
        const storeInfo = await this.storeRepository
          .createQueryBuilder('store')
          .select('store.name')
          .addSelect('store.image')
          .addSelect('store.sequence')
          .addSelect('store.telephone')
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

          const storeImage = storeInfo.image

          delete storeInfo.image
          return {
            ...storeInfo,
            storeImage: storeImage
          }
      }  catch (err) {
      console.log(err.message)
      throw new InternalServerErrorException("get query error")
    }
  }
}