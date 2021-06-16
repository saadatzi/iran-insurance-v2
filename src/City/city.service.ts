import { Injectable } from "@nestjs/common";
import { City } from "./city.schema";
import { FilterCityDTO } from "./dto/filter-city.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class CityService {
    constructor(
        @InjectModel(City.name) 
        private readonly cityModel: Model<City>,
    ){}

    async getCities(): Promise<City[]> {
            return this.cityModel.find()
    }

    async createCity(filterCityDTO: FilterCityDTO): Promise<City>{
        // const {name, province, areaCode} = filterCityDTO
        const city = new this.cityModel(filterCityDTO)

        try {
            return city.save()
        }catch(err) {
            console.log(err)
        }
    }

    async updateCity(id: string, filterCityDTO: FilterCityDTO, user:object): Promise<City>{
        const city = await this.cityModel.findById(id)
        Object.assign(City, filterCityDTO)
        try {
            return await city.save()
        }catch(err) {
            console.log(err)
        }
    }

    async deleteCity(id: string, user:object): Promise<City>{
        try {
            return await this.cityModel.findByIdAndDelete(id)
        }catch(err) {
            console.log(err)
        }
    }
    

}