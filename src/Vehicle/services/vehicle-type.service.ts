import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { FilterVehicleTypeDTO } from "../dto/filter-VehicleType.dto";
import { VehicleType } from "../Schemas/vehicleType.schema";

@Injectable()
export class VehicleTypeService {
    constructor(
        @InjectModel(VehicleType.name) 
        private VehicleType: Model<VehicleType>,
    ){}
    // ............................ vehicle type ...................//
    async getVehiclesType(): Promise<VehicleType[]> {
        return await this.VehicleType.find()
    }


    async getVehicleType(id: string): Promise<VehicleType> {
        return await this.VehicleType.findById(id)
    }

    async createVehicleType(filterVehicleTypeDTO: FilterVehicleTypeDTO): Promise<VehicleType>{
        // const {name, province, areaCode} = filterProvinceDTO
        const vehicleType = new this.VehicleType(filterVehicleTypeDTO)

        try {
            return await vehicleType.save()
        }catch(err) {
            console.log(err)
        }
    }

    async updateVehicleType(id: string, filterVehicleTypeDTO: FilterVehicleTypeDTO, user:object): Promise<VehicleType>{
        const vehicleType = await this.VehicleType.findById(id)
        Object.assign(vehicleType, filterVehicleTypeDTO)
        try {
            return await vehicleType.save()
        }catch(err) {
            console.log(err)
        }
    }

    async deleteVehicleType(id: string, user:object): Promise<VehicleType>{
        try {
            return await this.VehicleType.findByIdAndDelete(id)
        }catch(err) {
            console.log(err)
        }
    }

}