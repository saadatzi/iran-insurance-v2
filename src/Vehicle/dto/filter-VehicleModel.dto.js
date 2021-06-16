"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FilterVehicleModelDTO = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var FilterVehicleModelDTO = /** @class */ (function () {
    function FilterVehicleModelDTO() {
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.MaxLength(20),
        swagger_1.ApiProperty({
            description: 'Lesson title',
            "default": 'Physics'
        })
    ], FilterVehicleModelDTO.prototype, "name");
    __decorate([
        swagger_1.ApiProperty({
            description: 'Vehicle brand Object Id',
            "default": '60c5fcf47db03439e47fe76d'
        })
    ], FilterVehicleModelDTO.prototype, "brand");
    __decorate([
        swagger_1.ApiProperty({
            description: 'Vehicle type Object Id',
            "default": '60c5fcf47db03439e47fe76d'
        })
    ], FilterVehicleModelDTO.prototype, "type");
    __decorate([
        swagger_1.ApiProperty({
            description: 'Vehicle detail Object Id',
            "default": '60c5fcf47db03439e47fe76d'
        })
    ], FilterVehicleModelDTO.prototype, "detail");
    return FilterVehicleModelDTO;
}());
exports.FilterVehicleModelDTO = FilterVehicleModelDTO;
