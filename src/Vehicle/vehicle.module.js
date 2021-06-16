"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VehicleModule = void 0;
var common_1 = require("@nestjs/common");
var vehicleModel_schema_1 = require("./Schemas/vehicleModel.schema");
var vehicle_model_service_1 = require("./Services/vehicle-model.service");
var vehicle_type_service_1 = require("./Services/vehicle-type.service");
var auth_module_1 = require("../Auth/auth.module");
var mongoose_1 = require("@nestjs/mongoose");
var vehicle_controller_1 = require("./vehicle.controller");
var vehicleType_schema_1 = require("./Schemas/vehicleType.schema");
var vehicleDetail_schema_1 = require("./Schemas/vehicleDetail.schema");
var vehicleBrand_schema_1 = require("./Schemas/vehicleBrand.schema");
var vehicleUnit_schema_1 = require("./Schemas/vehicleUnit.schema");
var vehiclePrice_schema_1 = require("./Schemas/vehiclePrice.schema");
var VehicleModule = /** @class */ (function () {
    function VehicleModule() {
    }
    VehicleModule = __decorate([
        common_1.Module({
            imports: [
                mongoose_1.MongooseModule.forFeature([
                    {
                        name: vehicleModel_schema_1.VehicleModel.name,
                        schema: vehicleModel_schema_1.VehicleModelSchema
                    },
                    {
                        name: vehicleDetail_schema_1.VehicleDetail.name,
                        schema: vehicleDetail_schema_1.VehicleDetailSchema
                    },
                    {
                        name: vehicleType_schema_1.VehicleType.name,
                        schema: vehicleType_schema_1.VehicleTypeSchema
                    },
                    {
                        name: vehicleBrand_schema_1.VehicleBrand.name,
                        schema: vehicleBrand_schema_1.VehicleBrandSchema
                    },
                    {
                        name: vehicleUnit_schema_1.VehicleUnit.name,
                        schema: vehicleUnit_schema_1.VehicleUnitSchema
                    },
                    {
                        name: vehiclePrice_schema_1.VehiclePrice.name,
                        schema: vehiclePrice_schema_1.VehiclePriceSchema
                    }
                ]),
                auth_module_1.AuthModule
            ],
            providers: [vehicle_model_service_1.VehicleModelService, vehicle_type_service_1.VehicleTypeService],
            controllers: [vehicle_controller_1.VehicleController]
        })
    ], VehicleModule);
    return VehicleModule;
}());
exports.VehicleModule = VehicleModule;
