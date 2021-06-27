<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FilterVehicleTypeDTO } from '../dto/filter-VehicleType.dto';
import { VehicleType } from '../schemas/vehicleType.schema';

@Injectable()
export class VehicleTypeService {
  constructor(
    @InjectModel(VehicleType.name)
    private VehicleType: Model<VehicleType>,
  ) {}
  // ............................ vehicle type ...................//
  async getVehiclesType(): Promise<VehicleType[]> {
    return await this.VehicleType.find();
  }

  async getVehicleType(id: string): Promise<VehicleType> {
    return await this.VehicleType.findById(id);
  }

  async createVehicleType(
    filterVehicleTypeDTO: FilterVehicleTypeDTO,
  ): Promise<VehicleType> {
    // const {name, province, areaCode} = filterProvinceDTO
    const vehicleType = new this.VehicleType(filterVehicleTypeDTO);

    try {
      return await vehicleType.save();
    } catch (err) {
      console.log(err);
=======
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { FilterVehicleTypeDTO } from "../dto/filter-VehicleType.dto";
import { VehicleType } from "../schemas/vehicleType.schema";
import * as ConstValue from 'CustomMsg/ConstValue.json'

@Injectable()
export class VehicleTypeService {
    constructor(
        @InjectModel(VehicleType.name) 
        private VehicleType: Model<VehicleType>,
    ){}
    // ............................ vehicle type ...................//
    async getVehiclesType(page: number, search: string): Promise<VehicleType[]> {
        const regex = search? {'name': {"$regex": new RegExp(search, 'i')}}: {}
        page = page? page : 1
        return this.VehicleType
        .find(regex)
        .limit(ConstValue.Limit)
        .skip(ConstValue.Limit * (Number(page)-1))
        .exec()
>>>>>>> fd84b4d7f0cda7b35561f69ef09848ec83a943fa
    }
  }

  async updateVehicleType(
    id: string,
    filterVehicleTypeDTO: FilterVehicleTypeDTO,
    user: object,
  ): Promise<VehicleType> {
    const vehicleType = await this.VehicleType.findById(id);
    Object.assign(vehicleType, filterVehicleTypeDTO);
    try {
      return await vehicleType.save();
    } catch (err) {
      console.log(err);
    }
  }

  async deleteVehicleType(id: string, user: object): Promise<VehicleType> {
    try {
      return await this.VehicleType.findByIdAndDelete(id);
    } catch (err) {
      console.log(err);
    }
  }
}
