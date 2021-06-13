import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { City } from "./city.entity";
import {v4 as uuid} from 'uuid'
import { FilterCityDTO } from "./dto/filter-city.dto";

@Injectable()
export class CityService {
    constructor(
        @InjectRepository(City) 
        private CityRepository: Repository<City>,
    ){}

    async getCities(): Promise<City[]> {
            return this.CityRepository.find();
        }

    async createCity(FilterCityDTO: FilterCityDTO): Promise<City>{
        const {name, startDate, endDate} = FilterCityDTO
        const city = this.CityRepository.create({
            name,
            province,
            endDate
        })

        try {
            return this.CityRepository.save(city)
        }catch(err) {
            console.log(err)
        }
    }

    

}