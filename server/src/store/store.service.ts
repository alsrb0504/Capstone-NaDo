import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFile } from 'fs/promises';
import { join } from 'path'
import Store from 'src/entity/store/store.entity';
import Menu from 'src/entity/menu/menu.entity';
import { DataSource, Repository } from 'typeorm';
import Storebusinesstime from 'src/entity/storebusinesstime/storebusinesstime.entity';
import { StoreQueryService } from './storequery.service';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store) private storeRepository: Repository<Store>,
    @InjectRepository(Menu) private menuRepository: Repository<Menu>,
    @InjectRepository(Storebusinesstime) private storeBuisnesstimeRepository: Repository<Storebusinesstime>,
    private readonly dataSource: DataSource,
    private readonly storeQueryService: StoreQueryService
  ) {}

  async storeInfoInsert() {

    const isExist = await this.storeQueryService.getAllStore()
    if(isExist.length > 0) {
      return null
    }
    const storeDataJson = await readFile(join(process.cwd(), 'src', 'static', 'crawling.json'))
    const storeData = JSON.parse(storeDataJson.toString())

    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()

    for(let storeInfo in storeData) {
      const {shopName, shopImg, shopAddress, shopContactNumber, menuLists, shopOpenTime_, locationLatLong} = storeData[storeInfo]
      try {
        await queryRunner.startTransaction()
        
        console.log(locationLatLong)
        await this.storeRepository
        .createQueryBuilder('store')
        .insert()
        .into(Store)
        .values({
          name: shopName,
          address: shopAddress,
          telephone: shopContactNumber,
          image: shopImg,
          lat: locationLatLong?.lat || null,
          long: locationLatLong?.long || null,
        })
        .execute()
        
        const {sequence} = await this.getStoreByName(shopName)
        console.log(sequence)
        const menu = []
        for(let menuName in menuLists) {
          menu.push({
            menuName,
            menuPrice: menuLists[menuName].coffeePrice,
            menuImg: menuLists[menuName].coffeeImgUrl,
            isReported: false,
            store: {
              sequence
            }
          })
        }
          await this.menuRepository
            .createQueryBuilder('menu')
            .insert()
            .into(Menu)
            .values(menu)
            .execute()
        

        const storebusinesstime = []
        for(let storeTime in shopOpenTime_) {
          if(storeTime && storeTime !== "no") {
            storebusinesstime.push({
              store: {
                sequence: sequence
              },
              dayOfWeek: storeTime,
              startTime: shopOpenTime_[storeTime].open,
              endTime: shopOpenTime_[storeTime].deadline
            })
          }
        }

          await this.storeBuisnesstimeRepository
            .createQueryBuilder('storebuisnesstime')
            .insert()
            .into(Storebusinesstime)
            .values(storebusinesstime)
            .execute()
        

        await queryRunner.commitTransaction()
      } catch (err) {
        await queryRunner.rollbackTransaction()
        throw new InternalServerErrorException(err.message)
      }
    }
  }

  async insert(
    store: Partial<Store> 
  ) {
    await this.storeRepository
      .createQueryBuilder("insertStore")
      .insert()
      .into(Store)
      .values([store])
      .execute()
  }

  async getStoreByName(
    shopName: string
  ) {
    return await this.storeRepository
      .createQueryBuilder("store")
      .where('store.name = :name', {name: shopName})
      .getOne()
  }
}
// .where('user.identifier = :id', {id: identifier})
// .getOne()
