import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { FilterVehicleBrandDTO } from "../dto/filter-VehicleBrand.dto";
import { VehicleBrand } from "../schemas/vehicleBrand.schema";
import * as ConstValue from 'CustomMsg/ConstValue.json'

@Injectable()
export class VehicleBrandService {
    constructor(
        @InjectModel(VehicleBrand.name) 
        private VehicleBrand: Model<VehicleBrand>
    ){}

    async getVehiclesBrand(page: number, search: string): Promise<VehicleBrand[]> {
        const regex = search? {'name': {"$regex": new RegExp(search, 'i')}}: {}
        page = page? page : 1
        return this.VehicleBrand
        .find(regex)
        .limit(ConstValue.Limit)
        .skip(ConstValue.Limit * (Number(page)-1))
        .exec()
    }

    async getVehicleBrand(id: string): Promise<VehicleBrand> {
            return await this.VehicleBrand.findById(id)
    }

    async createVehicleBrand(filterVehicleBrandDTO: FilterVehicleBrandDTO): Promise<VehicleBrand>{
        // const {name, province, areaCode} = filterProvinceDTO
        const vehicleBrand = new this.VehicleBrand(filterVehicleBrandDTO)

        try {
            return await vehicleBrand.save()
        }catch(err) {
            console.log(err)
        }
    }

    async updateVehicleBrand(id: string, filterVehicleBrandDTO: FilterVehicleBrandDTO, user:object): Promise<VehicleBrand>{
        const vehicleBrand = await this.VehicleBrand.findById(id)
        Object.assign(VehicleBrand, filterVehicleBrandDTO)
        try {
            return await vehicleBrand.save()
        }catch(err) {
            console.log(err)
        }
    }

    async deleteVehicleBrand(id: string, user:object): Promise<VehicleBrand>{
        try {
            return await this.VehicleBrand.findByIdAndDelete(id)
        }catch(err) {
            console.log(err)
        }
    }

}