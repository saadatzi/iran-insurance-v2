import { Injectable } from "@nestjs/common";
import { Province } from "./province.schema";
import { FilterProvinceDTO } from "./dto/filter-province.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import * as ConstValue from 'CustomMsg/ConstValue.json'


@Injectable()
export class ProvinceService {
    constructor(
        @InjectModel(Province.name) 
        private Province: Model<Province>,
    ){}

    async getProvince(id: string): Promise<Province> {
        return await this.Province.findById(id)
    }

    async getProvinces(page: number, search: string): Promise<Province[]> {
        const regex = search? {'name': {"$regex": new RegExp(search, 'i')}}: {}
        page = page? page : 1
        return this.Province
        .find(regex)
        .limit(ConstValue.Limit)
        .skip(ConstValue.Limit * (Number(page)-1))
        .exec()
    }

    async createProvince(filterProvinceDTO: FilterProvinceDTO): Promise<Province>{
        // const {name, province, areaCode} = filterProvinceDTO
        const province = new this.Province(filterProvinceDTO)

        try {
            return province.save()
        }catch(err) {
            console.log(err)
        }
    }
    
    async updateProvince(id: string, filterProvinceDTO: FilterProvinceDTO, user:object): Promise<Province>{
        const province = await this.Province.findById(id)
        Object.assign(Province, filterProvinceDTO)
        try {
            return await province.save()
        }catch(err) {
            console.log(err)
        }
    }

    async deleteProvince(id: string, user:object): Promise<Province>{
        try {
            return await this.Province.findByIdAndDelete(id)
        }catch(err) {
            console.log(err)
        }
    }
    

}