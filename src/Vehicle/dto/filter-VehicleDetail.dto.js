"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FilterVehicleDetailDTO = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var FilterVehicleDetailDTO = /** @class */ (function () {
    function FilterVehicleDetailDTO() {
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.MaxLength(20),
        swagger_1.ApiProperty({ description: 'Detail name', "default": 'DetailName1' })
    ], FilterVehicleDetailDTO.prototype, "name");
    __decorate([
        class_validator_1.IsNumber(),
        swagger_1.ApiProperty({ description: 'driverObligation', "default": 'driverObligation1' })
    ], FilterVehicleDetailDTO.prototype, "driverObligation");
    __decorate([
        class_validator_1.IsNumber(),
        swagger_1.ApiProperty({ description: 'casualtyObligation', "default": 'casualtyObligation1' })
    ], FilterVehicleDetailDTO.prototype, "casualtyObligation");
    __decorate([
        class_validator_1.IsNumber(),
        swagger_1.ApiProperty({ description: 'driverDamagePrice', "default": 'driverDamagePrice1' })
    ], FilterVehicleDetailDTO.prototype, "driverDamagePrice");
    __decorate([
        class_validator_1.IsNumber(),
        swagger_1.ApiProperty({ description: 'dailyDamagePrice', "default": 'dailyDamagePrice1' })
    ], FilterVehicleDetailDTO.prototype, "dailyDamagePrice");
    __decorate([
        class_validator_1.IsNumber(),
        swagger_1.ApiProperty({ description: 'dailyDamagePrice', "default": '[{month: 6, percent: 30}]' })
    ], FilterVehicleDetailDTO.prototype, "validityDuration");
    __decorate([
        class_validator_1.IsNumber(),
        swagger_1.ApiProperty({ description: 'financialOblications', "default": '[{amount: 300000, basePrice: 16000000}]' })
    ], FilterVehicleDetailDTO.prototype, "financialOblications");
    __decorate([
        class_validator_1.IsNumber(),
        swagger_1.ApiProperty({ description: 'isAnotherType', "default": false })
    ], FilterVehicleDetailDTO.prototype, "isAnotherType");
    __decorate([
        class_validator_1.IsNumber(),
        swagger_1.ApiProperty({ description: 'anotherTypeUnit Object Id', "default": '60c5fcf47db03439e47fe76d' })
    ], FilterVehicleDetailDTO.prototype, "anotherTypeUnit");
    __decorate([
        class_validator_1.IsNumber(),
        swagger_1.ApiProperty({ description: 'dangerousMaterialCarrierPercent', "default": 60 })
    ], FilterVehicleDetailDTO.prototype, "dangerousMaterialCarrierPercent");
    __decorate([
        class_validator_1.IsNumber(),
        swagger_1.ApiProperty({ description: 'outOfTownTrafficPercent', "default": 30 })
    ], FilterVehicleDetailDTO.prototype, "outOfTownTrafficPercent");
    return FilterVehicleDetailDTO;
}());
exports.FilterVehicleDetailDTO = FilterVehicleDetailDTO;
