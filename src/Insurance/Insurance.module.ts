import { Module } from '@nestjs/common';
import { InsuranceService } from './insurance.service'
import { InsuranceController } from './insurance.controller'
import { ThirdPartyModule } from 'tools/vehiclePrice.module';
import { VehicleModule } from 'Vehicle/vehicle.module';
import { VehicleModel, VehicleModelSchema } from 'Vehicle/Schemas/vehicleModel.schema';
import { VehicleBrand, VehicleBrandSchema } from 'Vehicle/Schemas/vehicleBrand.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleDetail, VehicleDetailSchema } from 'Vehicle/Schemas/vehicleDetail.schema';
import { VehicleType, VehicleTypeSchema } from 'Vehicle/Schemas/vehicleType.schema';
import { VehicleUnit, VehicleUnitSchema } from 'Vehicle/Schemas/vehicleUnit.schema';
import { VehiclePrice, VehiclePriceSchema } from 'Vehicle/Schemas/vehiclePrice.schema';

@Module({
    imports: [
        MongooseModule.forFeature( [
            { 
                name: VehicleModel.name,
                schema: VehicleModelSchema,
            },
            {
                name: VehicleDetail.name,
                schema: VehicleDetailSchema
            },
            {
                name: VehicleType.name,
                schema: VehicleTypeSchema
            },
            {
                name: VehicleBrand.name,
                schema: VehicleBrandSchema
            },
            {
                name: VehicleUnit.name,
                schema: VehicleUnitSchema
            },
            {
                name: VehiclePrice.name,
                schema: VehiclePriceSchema
            }
            
        ]),
        ThirdPartyModule
    ],
    providers: [InsuranceService],
    controllers : [InsuranceController]
})
export class InsuranceModule {}
