<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FilterVehiclePriceDTO } from '../dto/filter-VehiclePrice.dto';
import { VehiclePrice } from '../schemas/vehiclePrice.schema';
=======
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { FilterVehiclePriceDTO } from "../dto/filter-VehiclePrice.dto";
import { VehiclePrice } from "../schemas/vehiclePrice.schema";
import * as ConstValue from 'CustomMsg/ConstValue.json'

>>>>>>> fd84b4d7f0cda7b35561f69ef09848ec83a943fa

@Injectable()
export class VehiclePriceService {
  constructor(
    @InjectModel(VehiclePrice.name)
    private VehiclePrice: Model<VehiclePrice>,
  ) {}

<<<<<<< HEAD
  async getVehiclesPrice(): Promise<VehiclePrice[]> {
    return await this.VehiclePrice.find();
  }
=======
    async getVehiclesPrice(page: number, search: string): Promise<VehiclePrice[]> {
        const regex = search? {'name': {"$regex": new RegExp(search, 'i')}}: {}
        page = page? page : 1
        return this.VehiclePrice
        .find(regex)
        .limit(ConstValue.Limit)
        .skip(ConstValue.Limit * (Number(page)-1))
        .exec()
    }
>>>>>>> fd84b4d7f0cda7b35561f69ef09848ec83a943fa

  async getVehiclePrice(id: string): Promise<VehiclePrice> {
    return await this.VehiclePrice.findById(id);
  }

  async createVehiclePrice(
    filterVehiclePriceDTO: FilterVehiclePriceDTO,
  ): Promise<VehiclePrice> {
    const vehiclePrice = new this.VehiclePrice(filterVehiclePriceDTO);

    try {
      return await vehiclePrice.save();
    } catch (err) {
      console.log(err);
    }
  }

  async updateVehiclePrice(
    id: string,
    filterVehiclePriceDTO: FilterVehiclePriceDTO,
    user: object,
  ): Promise<VehiclePrice> {
    const vehiclePrice = await this.VehiclePrice.findById(id);
    Object.assign(vehiclePrice, filterVehiclePriceDTO);
    try {
      return await vehiclePrice.save();
    } catch (err) {
      console.log(err);
    }
  }

  async deleteVehiclePrice(id: string, user: object): Promise<VehiclePrice> {
    try {
      return await this.VehiclePrice.findByIdAndDelete(id);
    } catch (err) {
      console.log(err);
    }
  }
}
