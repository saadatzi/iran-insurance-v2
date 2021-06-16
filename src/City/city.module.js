"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CityModule = void 0;
var common_1 = require("@nestjs/common");
var city_schema_1 = require("./city.schema");
var city_service_1 = require("./city.service");
var city_controller_1 = require("./city.controller");
var auth_module_1 = require("../Auth/auth.module");
var mongoose_1 = require("@nestjs/mongoose");
var CityModule = /** @class */ (function () {
    function CityModule() {
    }
    CityModule = __decorate([
        common_1.Module({
            imports: [
                mongoose_1.MongooseModule.forFeature([{ name: city_schema_1.City.name, schema: city_schema_1.CitySchema }]),
                auth_module_1.AuthModule
            ],
            providers: [city_service_1.CityService],
            controllers: [city_controller_1.CityController]
        })
    ], CityModule);
    return CityModule;
}());
exports.CityModule = CityModule;
