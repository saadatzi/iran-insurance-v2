<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FilterVehicleDetailDTO } from '../dto/filter-VehicleDetail.dto';
import { VehicleDetail } from '../schemas/vehicleDetail.schema';

@Injectable()
export class VehicleDetailService {
  constructor(
    @InjectModel(VehicleDetail.name)
    private VehicleDetail: Model<VehicleDetail>,
  ) {}

  async getVehiclesDetail(): Promise<VehicleDetail[]> {
    return await this.VehicleDetail.find();
  }

  async getVehicleDetail(id: string): Promise<VehicleDetail> {
    return await this.VehicleDetail.findById(id);
  }

  async createVehicleDetail(
    filterVehicleDetailDTO: FilterVehicleDetailDTO,
  ): Promise<VehicleDetail> {
    // const {name, province, areaCode} = filterProvinceDTO
    const vehicleDetail = new this.VehicleDetail(filterVehicleDetailDTO);

    try {
      return await vehicleDetail.save();
    } catch (err) {
      console.log(err);
=======
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { FilterVehicleDetailDTO } from "../dto/filter-VehicleDetail.dto";
import { VehicleDetail } from "../schemas/vehicleDetail.schema";
import * as ConstValue from 'CustomMsg/ConstValue.json'


@Injectable()
export class VehicleDetailService {
    constructor(
        @InjectModel(VehicleDetail.name)
        private VehicleDetail: Model<VehicleDetail>
    ){}

    async getVehiclesDetail(page: number, search: string): Promise<VehicleDetail[]> {
        const regex = search? {'name': {"$regex": new RegExp(search, 'i')}}: {}
        page = page? page : 1
        return this.VehicleDetail
        .find(regex)
        .limit(ConstValue.Limit)
        .skip(ConstValue.Limit * (Number(page)-1))
        .exec()
    }

    async getVehicleDetail(id: string): Promise<VehicleDetail> {
            return await this.VehicleDetail.findById(id)
>>>>>>> fd84b4d7f0cda7b35561f69ef09848ec83a943fa
    }
  }

  async updateVehicleDetail(
    id: string,
    filterVehicleDetailDTO: FilterVehicleDetailDTO,
    user: object,
  ): Promise<VehicleDetail> {
    const vehicleDetail = await this.VehicleDetail.findById(id);
    Object.assign(vehicleDetail, filterVehicleDetailDTO);
    try {
      return await vehicleDetail.save();
    } catch (err) {
      console.log(err);
    }
  }

  async deleteVehicleDetail(id: string, user: object): Promise<VehicleDetail> {
    try {
      return await this.VehicleDetail.findByIdAndDelete(id);
    } catch (err) {
      console.log(err);
    }
  }
}
