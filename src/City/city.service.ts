import { Injectable } from "@nestjs/common";
import { City } from "./city.schema";
import { FilterCityDTO } from "./dto/filter-city.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import * as ConstValue from 'CustomMsg/ConstValue.json'

@Injectable()
export class CityService {
    constructor(
        @InjectModel(City.name) 
        private readonly City: Model<City>,
    ){}

    async getCity(id: string): Promise<City> {
        return await this.City.findById(id)
    }

    async getCities(page: number, search: string): Promise<City[]> {
            const regex = search? {'name': {"$regex": new RegExp(search, 'i')}}: {}
            page = page? page : 1
            return this.City
            .find(regex)
            .limit(ConstValue.Limit)
            .skip(ConstValue.Limit * (Number(page)-1))
            .exec()
    }

    async createCity(filterCityDTO: FilterCityDTO): Promise<City>{
        // const {name, province, areaCode} = filterCityDTO
        const city = new this.City(filterCityDTO)

        try {
            return city.save()
        }catch(err) {
            console.log(err)
        }
    }

    async updateCity(id: string, filterCityDTO: FilterCityDTO, user:object): Promise<City>{
        const city = await this.City.findById(id)
        Object.assign(City, filterCityDTO)
        try {
            return await city.save()
        }catch(err) {
            console.log(err)
        }
    }

    async deleteCity(id: string, user:object): Promise<City>{
        try {
            return await this.City.findByIdAndDelete(id)
        }catch(err) {
            console.log(err)
        }
    }
    

}