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

    

}