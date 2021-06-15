import { Injectable } from "@nestjs/common";
import { Province } from "./province.schema";
import { FilterProvinceDTO } from "./dto/filter-province.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class ProvinceService {
    constructor(
        @InjectModel(Province.name) 
        private provinceModel: Model<Province>,
    ){}

    async getProvinces(): Promise<Province[]> {
            return this.provinceModel.find()
    }

    async createProvince(filterProvinceDTO: FilterProvinceDTO): Promise<Province>{
        // const {name, province, areaCode} = filterProvinceDTO
        const province = new this.provinceModel(filterProvinceDTO)

        try {
            return province.save()
        }catch(err) {
            console.log(err)
        }
    }

    

}