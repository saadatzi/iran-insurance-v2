import { Module } from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { InsuranceController } from './insurance.controller';
import { ThirdPartyModule } from 'tools/vehiclePrice.module';
import { VehicleModule } from 'Vehicle/vehicle.module';
import {
  VehicleModel,
  VehicleModelSchema,
} from 'Vehicle/schemas/vehicleModel.schema';
import {
  VehicleBrand,
  VehicleBrandSchema,
} from 'Vehicle/schemas/vehicleBrand.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {
  VehicleDetail,
  VehicleDetailSchema,
} from 'Vehicle/schemas/vehicleDetail.schema';
import {
  VehicleType,
  VehicleTypeSchema,
} from 'Vehicle/schemas/vehicleType.schema';
import {
  VehicleUnit,
  VehicleUnitSchema,
} from 'Vehicle/schemas/vehicleUnit.schema';
import {
  VehiclePrice,
  VehiclePriceSchema,
} from 'Vehicle/schemas/vehiclePrice.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: VehicleModel.name,
        schema: VehicleModelSchema,
      },
      {
        name: VehicleDetail.name,
        schema: VehicleDetailSchema,
      },
      {
        name: VehicleType.name,
        schema: VehicleTypeSchema,
      },
      {
        name: VehicleBrand.name,
        schema: VehicleBrandSchema,
      },
      {
        name: VehicleUnit.name,
        schema: VehicleUnitSchema,
      },
      {
        name: VehiclePrice.name,
        schema: VehiclePriceSchema,
      },
    ]),
    ThirdPartyModule,
  ],
  providers: [InsuranceService],
  controllers: [InsuranceController],
})
export class InsuranceModule {}
