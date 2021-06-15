import { Injectable } from "@nestjs/common";
import { FilterVehicleModelDTO } from "../dto/filter-VehicleModel.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { VehicleModel } from "../Schemas/vehicleModel.schema";


@Injectable()
export class VehicleModelService {
    constructor(
        @InjectModel(VehicleModel.name) 
        private VehicleModel: Model<VehicleModel>
    ){}

    async getVehiclesModel(): Promise<VehicleModel[]> {
            return await this.VehicleModel.find()
    }

    async getVehicleModel(id: string): Promise<VehicleModel> {
            return await this.VehicleModel.findById(id)
    }

    async createVehicleModel(filterVehicleModelDTO: FilterVehicleModelDTO): Promise<VehicleModel>{
        // const {name, province, areaCode} = filterProvinceDTO
        const vehicleModel = new this.VehicleModel(filterVehicleModelDTO)

        try {
            return await vehicleModel.save()
        }catch(err) {
            console.log(err)
        }
    }

    async updateVehicleModel(id: string, filterVehicleModelDTO: FilterVehicleModelDTO, user:object): Promise<VehicleModel>{
        const vehicleModel = await this.VehicleModel.findById(id)
        Object.assign(vehicleModel, filterVehicleModelDTO)
        try {
            return await vehicleModel.save()
        }catch(err) {
            console.log(err)
        }
    }

    async deleteVehicleModel(id: string, user:object): Promise<VehicleModel>{
        try {
            return await this.VehicleModel.findByIdAndDelete(id)
        }catch(err) {
            console.log(err)
        }
    }

}