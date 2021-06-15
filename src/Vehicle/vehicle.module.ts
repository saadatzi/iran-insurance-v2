import { Module } from '@nestjs/common';
import { VehicleModel, VehicleModelSchema } from './Schemas/vehicleModel.schema';
import { VehicleModelService } from './Services/vehicle-model.service'
import { VehicleTypeService } from './Services/vehicle-type.service'
import { AuthModule } from '../Auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleController } from './vehicle.controller';
import { VehicleType, VehicleTypeSchema } from './Schemas/vehicleType.schema';
import { VehicleDetail, VehicleDetailSchema } from './Schemas/vehicleDetail.schema';
import { VehicleBrand, VehicleBrandSchema } from './Schemas/vehicleBrand.schema';
import { VehicleUnit, VehicleUnitSchema } from './Schemas/vehicleUnit.schema';
import { VehiclePrice, VehiclePriceSchema } from './Schemas/vehiclePrice.schema';

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
        AuthModule
    ],
    providers: [VehicleModelService, VehicleTypeService],
    controllers : [VehicleController]
})
export class VehicleModule {}
