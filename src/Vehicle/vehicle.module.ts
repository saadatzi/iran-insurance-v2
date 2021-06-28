import { Module } from '@nestjs/common';
import { VehicleModel, VehicleModelSchema } from './schemas/vehicleModel.schema';
import { VehicleModelService } from './services/vehicle-model.service'
import { VehicleTypeService } from './services/vehicle-type.service'
import { AuthModule } from '../Auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { VehicleController } from './vehicle.controller';
import { VehicleType, VehicleTypeSchema } from './schemas/vehicleType.schema';
import { VehicleDetail, VehicleDetailSchema } from './schemas/vehicleDetail.schema';
import { VehicleBrand, VehicleBrandSchema } from './schemas/vehicleBrand.schema';
import { VehicleUnit, VehicleUnitSchema } from './schemas/vehicleUnit.schema';
import { VehiclePrice, VehiclePriceSchema } from './schemas/vehiclePrice.schema';
import { VehicleDetailService } from './services/vehicle-detail.service';
import { VehicleUnitService } from './services/vehicle-unit.service';
import { VehiclePriceService } from './services/vehicle-price.service';
import { VehicleBrandService } from './services/vehicle-brand.service';

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
    providers: [VehicleModelService, VehicleTypeService, VehicleDetailService, VehicleUnitService, VehiclePriceService, VehicleBrandService],
    controllers : [VehicleController],
})
export class VehicleModule {}
