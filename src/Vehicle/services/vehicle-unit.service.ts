import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FilterVehicleUnitDTO } from '../dto/filter-VehicleUnit.dto';
import { VehicleUnit } from '../schemas/vehicleUnit.schema';

@Injectable()
export class VehicleUnitService {
  constructor(
    @InjectModel(VehicleUnit.name)
    private VehicleUnit: Model<VehicleUnit>,
  ) {}

  async getVehiclesUnit(): Promise<VehicleUnit[]> {
    return await this.VehicleUnit.find();
  }

  async getVehicleUnit(id: string): Promise<VehicleUnit> {
    return await this.VehicleUnit.findById(id);
  }

  async createVehicleUnit(
    filterVehicleUnitDTO: FilterVehicleUnitDTO,
  ): Promise<VehicleUnit> {
    // const {name, province, areaCode} = filterProvinceDTO
    const vehicleUnit = new this.VehicleUnit(filterVehicleUnitDTO);

    try {
      return await vehicleUnit.save();
    } catch (err) {
      console.log(err);
    }
  }

  async updateVehicleUnit(
    id: string,
    filterVehicleUnitDTO: FilterVehicleUnitDTO,
    user: object,
  ): Promise<VehicleUnit> {
    const vehicleUnit = await this.VehicleUnit.findById(id);
    Object.assign(vehicleUnit, filterVehicleUnitDTO);
    try {
      return await vehicleUnit.save();
    } catch (err) {
      console.log(err);
    }
  }

  async deleteVehicleUnit(id: string, user: object): Promise<VehicleUnit> {
    try {
      return await this.VehicleUnit.findByIdAndDelete(id);
    } catch (err) {
      console.log(err);
    }
  }
}
