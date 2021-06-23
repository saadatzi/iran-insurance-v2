import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { FilterVehicleUnitDTO } from "../dto/filter-VehicleUnit.dto";
import { VehicleUnit } from "../schemas/vehicleUnit.schema";
import * as ConstValue from 'CustomMsg/ConstValue.json'


@Injectable()
export class VehicleUnitService {
    constructor(
        @InjectModel(VehicleUnit.name) 
        private VehicleUnit: Model<VehicleUnit>
    ){}

    async getVehiclesUnit(page: number, search: string): Promise<VehicleUnit[]> {
        const regex = search? {'name': {"$regex": new RegExp(search, 'i')}}: {}
        page = page? page : 1
        return this.VehicleUnit
        .find(regex)
        .limit(ConstValue.Limit)
        .skip(ConstValue.Limit * (Number(page)-1))
        .exec()
    }

    async getVehicleUnit(id: string): Promise<VehicleUnit> {
            return await this.VehicleUnit.findById(id)
    }

    async createVehicleUnit(filterVehicleUnitDTO: FilterVehicleUnitDTO): Promise<VehicleUnit>{
        // const {name, province, areaCode} = filterProvinceDTO
        const vehicleUnit = new this.VehicleUnit(filterVehicleUnitDTO)

        try {
            return await vehicleUnit.save()
        }catch(err) {
            console.log(err)
        }
    }

    async updateVehicleUnit(id: string, filterVehicleUnitDTO: FilterVehicleUnitDTO, user:object): Promise<VehicleUnit>{
        const vehicleUnit = await this.VehicleUnit.findById(id)
        Object.assign(vehicleUnit, filterVehicleUnitDTO)
        try {
            return await vehicleUnit.save()
        }catch(err) {
            console.log(err)
        }
    }

    async deleteVehicleUnit(id: string, user:object): Promise<VehicleUnit>{
        try {
            return await this.VehicleUnit.findByIdAndDelete(id)
        }catch(err) {
            console.log(err)
        }
    }
}