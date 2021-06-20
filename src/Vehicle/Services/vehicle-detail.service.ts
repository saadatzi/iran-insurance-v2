import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { FilterVehicleDetailDTO } from "../dto/filter-VehicleDetail.dto";
import { VehicleDetail } from "../Schemas/vehicleDetail.schema";


@Injectable()
export class VehicleDetailService {
    constructor(
        @InjectModel(VehicleDetail.name)
        private VehicleDetail: Model<VehicleDetail>
    ){}

    async getVehiclesDetail(): Promise<VehicleDetail[]> {
            return await this.VehicleDetail.find()
    }

    async getVehicleDetail(id: string): Promise<VehicleDetail> {
            return await this.VehicleDetail.findById(id)
    }

    async createVehicleDetail(filterVehicleDetailDTO: FilterVehicleDetailDTO): Promise<VehicleDetail> {
        // const {name, province, areaCode} = filterProvinceDTO
        const vehicleDetail = new this.VehicleDetail(filterVehicleDetailDTO)

        try {
            return await vehicleDetail.save()
        }catch(err) {
            console.log(err)
        }
    }

    async updateVehicleDetail(id: string, filterVehicleDetailDTO: FilterVehicleDetailDTO, user:object): Promise<VehicleDetail>{
        const vehicleDetail = await this.VehicleDetail.findById(id)
        Object.assign(vehicleDetail, filterVehicleDetailDTO)
        try {
            return await vehicleDetail.save()
        }catch(err) {
            console.log(err)
        }
    }

    async deleteVehicleDetail(id: string, user:object): Promise<VehicleDetail>{
        try {
            return await this.VehicleDetail.findByIdAndDelete(id)
        }catch(err) {
            console.log(err)
        }
    }
}